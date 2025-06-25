const router = require('express').Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

function getPassFromFile() {

}

function getTokensFromFile() {
  
}

function writeTokensToFile() {
  
}

router.post('/login', async(req, res) => {
  correctPass = getPassFromFile();
  if (req.body.password != correctPass)
    return res.sendStatus(400);

  // cleaning invalid tokens
  var refreshTokenArray = [];
  const tokens = getTokensFromFile();
  for (var i = 0; i < tokens.length; i ++) {
    jwt.verify(
      tokens[i],
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return; // invalid token
        const { exp } = decoded;
        if (Date.now() >= exp * 1000)
          return; // expired token
        // refreshTokenArray = [...refreshTokenArray, tokens[i]];
        refreshTokenArray.append(tokens[i]);
      }
    );
  }
  
  const accessToken = jwt.sign({role: 'admin'}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
  const refreshToken = jwt.sign({role: 'admin'}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});

  refreshTokenArray.append(refreshToken);
  writeTokensToFile(refreshTokenArray);

  res.json({accessToken, refreshToken});
});

router.post('/logout', async(req, res) => {
  const refreshToken = req.body.jwt;
  var tokens = getTokensFromFile();
  
  // already logged out
  if (!tokens.includes(refreshToken)) {
    return res.sendStatus(204);
  }
  
  // delete token from file
  tokens = tokens.splice(tokens.indexOf(refreshToken), 1);
  writeTokensToFile(tokens);

  res.sendStatus(204);
});

module.exports = router;