const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const sharp = require("sharp");
const verifyJWT = require('../verifyJWT');

const upload = multer({ storage: multer.memoryStorage() });

router.post("/saveImage/:filename", verifyJWT, upload.single("image"), async(req, res) => {
    if (!req.file) return res.status(400).send("No file uploaded.");
    
    const {filename} = req.params;
    const outputPath = path.join(__dirname, `../images/${filename}.png`);

    try {
        await sharp(req.file.buffer).toFile(outputPath);
        return res.sendStatus(200);
    } catch (err) {
        console.error("Error processing image:", err);
        return res.sendStatus(500);
    }
});

async function writeTextToFile(text, file) {
    try {
        await fs.writeFile(file, text, 'utf8', () => {});
        return 'ok';
    } catch (err) {
        return err.message;
    }
}

router.post('/saveText/:filename', verifyJWT, async(req, res) => {
    const {filename} = req.params;
    const msg = await writeTextToFile(req.body.text, path.join(__dirname, `../texts/${filename}`));
    if (msg === 'ok') {
        return res.sendStatus(200);
    } else {
        return res.status(500).send(msg);
    }
});

async function getTextFromFile(file) {
    try {
        const data = await fs.readFile(file, 'utf8');
        return data;
    } catch (err) {
        return null;
    }
}

router.get('/getText/:filename', async(req, res) => {
    const {filename} = req.params;
    const text = await getTextFromFile(path.join(__dirname, `../texts/${filename}`));
    return res.send(text);
});


module.exports = router;