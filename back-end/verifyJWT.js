const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403); // invalid token
      const { exp } = decoded;
      if (Date.now() >= exp * 1000)
        return res.sendStatus(403); // expired token
      req.timestamp = Date.now();
      next();
    }
  );
}

module.exports = verifyJWT;