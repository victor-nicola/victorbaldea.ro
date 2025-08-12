const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const verifyJWT = require("../verifyJWT");
const sharp = require("sharp");

// Where to store gallery metadata
const GALLERIES_FILE = path.join(__dirname, "../images/gallery/800/galleries.json");

// Load galleries from file
function loadGalleries() {
    if (!fs.existsSync(GALLERIES_FILE)) {
        fs.writeFileSync(GALLERIES_FILE, "[]");
    }
    return JSON.parse(fs.readFileSync(GALLERIES_FILE, "utf-8"));
}

// Save galleries to file
function saveGalleries(galleries) {
    fs.writeFileSync(GALLERIES_FILE, JSON.stringify(galleries, null, 2));
}

// Load layout (contains imageColumns & imageOrder)
function loadLayout(galleryName) {
    const layoutFile = path.join(__dirname, "../images/gallery", galleryName, "layout.json");
    if (!fs.existsSync(layoutFile)) {
        return {
            columnCount: 3,
            layoutMode: 'manual',
            imageColumns: {},
            imageOrder: []
        };
    }
    return JSON.parse(fs.readFileSync(layoutFile, "utf-8"));
}

// Save layout
function saveLayout(galleryName, layout) {
    const layoutFile = path.join(__dirname, "../images/gallery", galleryName, "layout.json");
    const galleryDir = path.join(__dirname, "../images/gallery", galleryName);

    if (!fs.existsSync(galleryDir)) {
        fs.mkdirSync(galleryDir, { recursive: true });
    }

    fs.writeFileSync(layoutFile, JSON.stringify(layout, null, 2));
}

let galleries = loadGalleries();

// Multer setup for gallery covers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../images/gallery/800/"));
    },
    filename: function (req, file, cb) {
        const rawName = req.body.name || "untitled";
        const safeName = rawName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        const ext = path.extname(file.originalname);
        const uniqueName = `${safeName}-${Date.now()}${ext}`;
        cb(null, uniqueName);
    },
});
const upload = multer({ storage });

// Multer setup for individual gallery images
const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const galleryName = req.params.galleryName;
        const galleryDir = path.join(__dirname, "../images/gallery", galleryName);
        if (!fs.existsSync(galleryDir)) {
            fs.mkdirSync(galleryDir, { recursive: true });
        }
        cb(null, galleryDir);
    },
    filename: function (req, file, cb) {
        const galleryName = req.params.galleryName;
        const galleryDir = path.join(__dirname, "../images/gallery", galleryName);

        let maxNum = 0;
        if (fs.existsSync(galleryDir)) {
            const files = fs.readdirSync(galleryDir);
            files.forEach(file => {
                const match = file.match(/^(\d+)(-max)?\.jpe?g$/i);
                if (match) {
                    maxNum = Math.max(maxNum, parseInt(match[1]));
                }
            });
        }
        const nextNum = maxNum + 1;
        const ext = path.extname(file.originalname);
        cb(null, `${nextNum}${ext}`);
    },
});
const imageUpload = multer({ storage: imageStorage });

// GET all galleries
router.get("/", (req, res) => {
    res.json(galleries);
});

// Reorder galleries
router.post("/reorder", verifyJWT, (req, res) => {
    const { ids } = req.body;
    const reordered = ids
        .map((id) => galleries.find((g) => g.id === id))
        .filter(Boolean);
    galleries = reordered;
    saveGalleries(galleries);
    res.json({ success: true });
});

// Add new gallery
router.post("/", verifyJWT, upload.single("cover"), (req, res) => {
    const { name } = req.body;

    // Create safe folder name (slug)
    const safeName = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    
    const index = galleries.findIndex((g) => g.folderName === safeName);
    if (index !== -1) return res.status(500).json({ error: "Already Exists" });

    const galleryDir = path.join(__dirname, "../images/gallery", safeName);

    // Create folder if it doesn't exist
    if (!fs.existsSync(galleryDir)) {
        fs.mkdirSync(galleryDir, { recursive: true });
    }

    // Create initial empty layout.json
    const layoutFile = path.join(galleryDir, "layout.json");
    if (!fs.existsSync(layoutFile)) {
        fs.writeFileSync(layoutFile, JSON.stringify({
            columnCount: 3,
            layoutMode: "manual",
            imageColumns: {},
            imageOrder: []
        }, null, 2));
    }

    const coverFilename = req.file.filename;
    const newGallery = {
        id: uuidv4(),
        name,
        folderName: safeName,   // Save the slug so you can find it later
        coverFilename,
    };

    galleries.push(newGallery);
    saveGalleries(galleries);

    res.json(newGallery);
});

// Add multiple images to a specific gallery
router.post("/:galleryName/images", verifyJWT, imageUpload.array("images", 20), async (req, res) => {
    const { galleryName } = req.params;

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No image files provided" });
    }

    const galleryDir = path.join(__dirname, "../images/gallery", galleryName);

    // Determine the next available index
    let maxNum = 0;
    const existingFiles = fs.readdirSync(galleryDir);
    existingFiles.forEach(file => {
        const match = file.match(/^(\d+)-max\.jpe?g$/i);
        if (match) {
            maxNum = Math.max(maxNum, parseInt(match[1]));
        }
    });

    const layout = loadLayout(galleryName);
    if (!layout.imageOrder) layout.imageOrder = [];
    if (!layout.imageColumns) layout.imageColumns = {};

    const processedFilenames = [];

    // Process each uploaded file
    for (const [idx, file] of req.files.entries()) {
        const nextNum = maxNum + idx + 1;
        const maxFilename = `${nextNum}-max.jpg`;
        const thumbFilename = `${nextNum}.jpg`;

        const maxFilePath = path.join(galleryDir, maxFilename);
        const thumbFilePath = path.join(galleryDir, thumbFilename);

        // Move original file to max.jpg
        fs.renameSync(file.path, maxFilePath);

        // Create resized/compressed thumbnail
        await sharp(maxFilePath)
            .resize(600) // adjust width as needed
            // .jpeg({ quality: 90 })
            .toFile(thumbFilePath);

        // Update layout
        layout.imageOrder.push(thumbFilename);
        layout.imageColumns[thumbFilename] = idx % layout.columnCount;

        processedFilenames.push({
            max: maxFilename,
            thumb: thumbFilename
        });
    }

    saveLayout(galleryName, layout);

    res.json({
        success: true,
        filenames: processedFilenames,
        message: "Images added successfully"
    });
});

// Get images and layout for a specific gallery
router.get("/:galleryName", (req, res) => {
    const galleryName = req.params.galleryName;
    const galleryDir = path.join(__dirname, "../images/gallery", galleryName);

    fs.readdir(galleryDir, (err, files) => {
        if (err) {
            console.error("Error reading gallery folder:", err);
            return res.status(404).json({ error: "Gallery not found" });
        }

        const imagesMap = {};
        files.forEach((file) => {
            if (file === 'layout.json') return;

            const match = file.match(/^(\d+)(-max)?\.jpe?g$/i);
            if (match) {
                const base = match[1];
                const isMax = !!match[2];
                if (!imagesMap[base]) imagesMap[base] = {};
                if (isMax) {
                    imagesMap[base].full = file;
                } else {
                    imagesMap[base].thumb = file;
                }
            }
        });

        const layout = loadLayout(galleryName);

        const imageOrder = (layout && Array.isArray(layout.imageOrder) && layout.imageOrder.length > 0)
            ? layout.imageOrder
            : Object.keys(imagesMap).sort((a, b) => parseInt(a) - parseInt(b)).map(key => imagesMap[key].thumb);
        
        const images = imageOrder
            .map(filename => {
                const match = filename.match(/^(\d+)/);
                if (!match) return null;
                const base = match[1];
                if (!imagesMap[base]) return null;
                return {
                    thumb: imagesMap[base].thumb,
                    full: imagesMap[base].full
                };
            })
            .filter(Boolean);

        res.json({
            images,
            layout
        });
    });
});

// Reorder images within a gallery (update layout.imageOrder)
router.post("/:galleryName/reorder", verifyJWT, (req, res) => {
    const { galleryName } = req.params;
    const { filenames } = req.body;

    if (!filenames || !Array.isArray(filenames)) {
        return res.status(400).json({ error: "Invalid filenames array" });
    }

    const layout = loadLayout(galleryName);
    layout.imageOrder = filenames;
    saveLayout(galleryName, layout);

    res.json({ success: true });
});

// Delete specific image from gallery
router.delete("/:galleryName/:filename", verifyJWT, (req, res) => {
    const { galleryName, filename } = req.params;
    const galleryDir = path.join(__dirname, "../images/gallery", galleryName);

    const imagePath = path.join(galleryDir, filename);
    if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
    }

    const match = filename.match(/^(\d+)\.jpe?g$/i);
    if (match) {
        const baseNum = match[1];
        const ext = path.extname(filename);
        const fullSizeFilename = `${baseNum}-max${ext}`;
        const fullSizePath = path.join(galleryDir, fullSizeFilename);
        if (fs.existsSync(fullSizePath)) {
            fs.unlinkSync(fullSizePath);
        }
    }

    const layout = loadLayout(galleryName);
    if (layout.imageOrder) {
        layout.imageOrder = layout.imageOrder.filter(f => f !== filename);
    }
    if (layout.imageColumns) {
        delete layout.imageColumns[filename];
    }
    saveLayout(galleryName, layout);

    res.json({ success: true });
});

// Edit gallery (rename & optional new cover)
router.put("/:id", verifyJWT, upload.single("cover"), (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const gallery = galleries.find((g) => g.id === id);
    if (!gallery) return res.status(404).json({ error: "Not found" });

    gallery.name = name;

    if (req.file) {
        const oldPath = path.join(
            __dirname,
            "../images/gallery/800/",
            gallery.coverFilename
        );
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

        gallery.coverFilename = req.file.filename;
    }

    saveGalleries(galleries);
    res.json(gallery);
});

// Delete gallery
router.delete("/:id", verifyJWT, (req, res) => {
    const { id } = req.params;
    const index = galleries.findIndex((g) => g.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });

    const [removed] = galleries.splice(index, 1);

    // Delete cover image file
    const coverPath = path.join(__dirname, "../images/gallery/800/", removed.coverFilename);
    if (fs.existsSync(coverPath)) {
        fs.unlinkSync(coverPath);
    }

    const folderName = removed.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    
    // Delete the entire gallery folder with all images and layout.json
    const galleryFolder = path.join(__dirname, "../images/gallery", folderName);
    if (fs.existsSync(galleryFolder)) {
        // Use recursive option to delete folder with all content
        try {
            fs.rmSync(galleryFolder, { recursive: true, force: true });
        } catch (err) {
            console.error(`Failed to delete gallery folder ${galleryFolder}:`, err);
            return res.status(500).json({ error: "Failed to delete gallery folder" });
        }
    }

    saveGalleries(galleries);
    res.json({ success: true });
});

// Get layout for a specific gallery
router.get("/:galleryName/layout", (req, res) => {
    const { galleryName } = req.params;
    const layout = loadLayout(galleryName);

    res.json(layout);
});

// Save layout for a specific gallery (including imageOrder)
router.post("/:galleryName/layout", verifyJWT, (req, res) => {
    const { galleryName } = req.params;
    const { columnCount, layoutMode, imageColumns, imageOrder } = req.body;

    if (!columnCount || !layoutMode) {
        return res.status(400).json({ error: "Missing required layout parameters" });
    }

    const layout = {
        columnCount,
        layoutMode,
        imageColumns: imageColumns || {},
        imageOrder: imageOrder || []
    };

    saveLayout(galleryName, layout);

    res.json({ success: true, layout });
});

module.exports = router;
