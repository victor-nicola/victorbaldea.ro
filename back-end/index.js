const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
// const auth = require('./routes/auth');
// const refreshToken = require('./routes/refreshToken');
// const upload = require('./routes/upload');
const getMedia = require('./routes/getMedia');
// const verifyJWT = require('./verifyJWT');

const app = express();

app.use((req, res, next) => {
  if (req.secure) {
    return next();
  }
  res.redirect(301, `https://${req.headers.host}${req.url}`);
});

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/images', express.static('images'));
// app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/test', (req, res) => {
  return res.send('test');
});

// public routes
// app.use('/api', auth);
// app.use('/api', refreshToken);
app.use('/api', getMedia);

// secure routes
// app.use('/api', verifyJWT, upload);

const httpsCredentials = {
  key: fs.readFileSync(`${process.env.KEY_PATH}`),
  cert: fs.readFileSync(`${process.env.CERT_PATH}`),
};
const httpsServer = https.createServer(httpsCredentials, app);

httpsServer.listen(process.env.SSL_PORT, () => console.log(`HTTPS Server running on port ${process.env.SSL_PORT}`));
app.listen(process.env.HTTP_PORT, () => console.log(`HTTP server on port ${process.env.HTTP_PORT}`));