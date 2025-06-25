const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const ffprobeInstaller = require('@ffprobe-installer/ffprobe');
const sharp = require('sharp');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

const storage = multer.diskStorage({
  destination: async(req, file, cb) => {
    const userDirUploads = path.join(UPLOADS_DIR, req.user, req.timestamp.toString());
    if (!fs.existsSync(userDirUploads)) {
      try {
        fs.mkdirSync(userDirUploads, { recursive: true });
      } catch(err) {
        console.log(err);
      }
    }

    cb(null, userDirUploads);
  },
  filename: async(req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/uploadImages', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.sendStatus(400);
  }
  for (var i = 0; i < req.files.length; i ++) {
    saveImageThumbnail(path.join(UPLOADS_DIR, req.user, req.timestamp.toString(), req.files[i].originalname));
  }
  res.sendStatus(204);
});

async function saveImageThumbnail(imagePath) {
  if (fs.existsSync(imagePath)) {
    try {
      const {dir, filename} = makeThumbnailFolder(imagePath);
      const thumbnailPath = path.join(dir, filename);

      await sharp(imagePath)
      .resize({ width: 512, height: 512 })
      .jpeg({ quality: 50 })
      .toFile(thumbnailPath);
    }
    catch (err) {
      console.log(err);
      return;
    }
  }
}

module.exports = router;