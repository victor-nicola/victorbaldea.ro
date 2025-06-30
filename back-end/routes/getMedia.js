const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.post('/getSlideshowImages', async (req, res) => {
  try {
    const pcFiles = await fs.readdir('./images/slideshow/pc');
    const mobileFiles = await fs.readdir('./images/slideshow/mobile');

    const sortFiles = (files) => 
      files
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .sort((a, b) => {
          const numA = parseInt(a.match(/\d+/));
          const numB = parseInt(b.match(/\d+/));
          return numA - numB;
        });

    const sortedPc = sortFiles(pcFiles);
    const sortedMobile = sortFiles(mobileFiles);

    res.json({pc: sortedPc, mobile: sortedMobile});
  } catch (err) {
    console.error(err);
    res.status(500).send('Error reading image folders');
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

router.post('/getText', async(req, res) => {
  const text = await getTextFromFile(path.join(__dirname, `../texts/${req.body.file}`));
  return res.send(text);
});

module.exports = router;