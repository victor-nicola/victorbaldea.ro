const router = require('express').Router();
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const TOKENS_FILE = path.join(__dirname, '../secure/tokens');

async function getTokensFromFile() {
  try {
    const data = await fs.readFile(TOKENS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

router.post('/checkRefreshToken', async(req, res) => {
  const refreshToken = req.body.jwt;
  const foundUser = await User.findOne({refreshToken: refreshToken});
  if (!foundUser)
    return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || foundUser._id.toString() !== decoded._id)
        return res.sendStatus(403); // invalid token or token id is not user's id
      const { exp } = decoded;
      if (Date.now() >= exp * 1000)
        return res.sendStatus(403); // expired token
      res.sendStatus(200);
    }
  );
});

router.post('/getAccessToken', async(req, res) => {
  if (!req.cookies?.refreshToken)
    return res.sendStatus(403); // no token
  const refreshToken = req.cookies.refreshToken;
  const tokens = await getTokensFromFile();
  if (!tokens.includes(refreshToken))
    return res.sendStatus(403);
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err)
        return res.sendStatus(403); // invalid token or token id is not user's id
      const { exp } = decoded;
      if (Date.now() >= exp * 1000)
        return res.sendStatus(403); // expired token
      const accessToken = jwt.sign({role: 'admin'}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
      res.json({accessToken});
    }
  );
});

module.exports = router;