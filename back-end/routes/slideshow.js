const router = require('express').Router();
const fs = require('fs-extra');
const path = require('path');
const verifyJWT = require('../verifyJWT');
const multer = require('multer');

const devices = ["pc", "mobile"];

// Ensure folders exist
devices.forEach((device) => {
    fs.ensureDirSync(getImagesFolder(device));
    const orderFile = getOrderFile(device);
    if (!fs.existsSync(orderFile)) {
        fs.writeJsonSync(orderFile, []);
    }
});

function getOrderFile(device) {
    return path.join(__dirname, '../images/slideshow', `${device}.json`);
}

function getImagesFolder(device) {
    return path.join(__dirname, '../images/slideshow', device);
}

// Multer storage with auto-renaming
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const device = req.params.device;
        cb(null, getImagesFolder(device));
    },
    filename: (req, file, cb) => {
        const device = req.params.device;
        const folder = getImagesFolder(device);

        let filename = file.originalname;
        let ext = path.extname(filename);
        let counter = 1;

        while (fs.existsSync(path.join(folder, filename))) {
            filename = `${counter}${ext}`;
            counter++;
        }
        cb(null, filename);
    },
});

const upload = multer({ storage });

// Reorder
router.post("/slideshow/:device/reorder", verifyJWT, async(req, res) => {
    const { device } = req.params;
    if (!devices.includes(device)) return res.status(400).send("Invalid device");

    const { images } = req.body;
    const folder = getImagesFolder(device);
    const files = await fs.readdir(folder);

    // Validate all filenames exist
    for (const img of images) {
        if (!files.includes(img)) {
            return res.status(400).send(`File not found: ${img}`);
        }
    }

    await fs.writeJson(getOrderFile(device), images);
    res.json({ success: true });
});

// Upload
router.post("/slideshow/:device/upload", verifyJWT, upload.array("images"), async(req, res) => {
    const { device } = req.params;
    if (!devices.includes(device)) return res.status(400).send("Invalid device");

    const orderFile = getOrderFile(device);
    const currentOrder = await fs.readJson(orderFile);

    // Append newly uploaded files to order
    const newFiles = req.files.map((f) => f.filename);
    const updatedOrder = [...currentOrder, ...newFiles];
    await fs.writeJson(orderFile, updatedOrder);

    res.json({ success: true, files: newFiles });
});

// Delete
router.delete("/slideshow/:device/:filename", verifyJWT, async(req, res) => {
    const { device, filename } = req.params;
    if (!devices.includes(device)) return res.status(400).send("Invalid device");

    const filePath = path.join(getImagesFolder(device), filename);
    if (!(await fs.pathExists(filePath))) {
        return res.status(404).send("File not found");
    }

    await fs.remove(filePath);

    // Remove from order file
    const orderFile = getOrderFile(device);
    let order = await fs.readJson(orderFile);
    order = order.filter((f) => f !== filename);
    await fs.writeJson(orderFile, order);

    res.json({ success: true });
});

// List images
router.get("/slideshow/:device", async(req, res) => {
    const { device } = req.params;

    if (!devices.includes(device)) return res.status(400).send("Invalid device");

    const folder = getImagesFolder(device);
    const orderFile = getOrderFile(device);

    const ordered = await fs.readJson(orderFile);
    const files = await fs.readdir(folder);

    // Keep only existing files in order
    const existingOrdered = ordered.filter((f) => files.includes(f));
    // Add new files not in order yet
    const remaining = files.filter((f) => !existingOrdered.includes(f));
    const finalList = [...existingOrdered, ...remaining];

    // Save updated order
    await fs.writeJson(orderFile, finalList);

    res.json(finalList.map((filename) => ({ filename })));
});

module.exports = router;