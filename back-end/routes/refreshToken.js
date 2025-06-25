const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.get('/checkRefreshToken', async(req, res) => {
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

router.get('/refreshToken', async(req, res) => {
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
      const accessToken = jwt.sign({_id: decoded._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
      res.json({accessToken});
    }
  );
});

module.exports = router;