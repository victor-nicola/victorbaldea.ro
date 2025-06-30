const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require("sharp");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/saveImage", upload.single("image"), async(req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  const outputPath = path.join(__dirname, req.file === 'about' ? "../images/poza-about.png" : "../images/workshops.jpg");

  try {
    await sharp(req.file.buffer)
      .toFile(outputPath);
    return res.sendStatus(200);
  } catch (err) {
    console.error("Error processing image:", err);
    return res.sendStatus(500);
  }
});

async function writeTextToFile(text, file) {
  try {
    await fs.writeFile(file, text, 'utf8');
    return 'ok';
  } catch (err) {
    return err.message;
  }
}

router.post('/saveText', async(req, res) => {
  const msg = await writeTextToFile(req.body.text, path.join(__dirname, `../texts/${req.body.file}`));
  if (msg === 'ok') {
    return res.sendStatus(200);
  } else {
    return res.status(500).send(msg);
  }
});

module.exports = router;