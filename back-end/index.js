const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const auth = require('./routes/auth');
const refreshToken = require('./routes/refreshToken');
const static = require('./routes/static');
const gallery = require('./routes/gallery');
const slideshow = require('./routes/slideshow');

const app = express();

// app.use((req, res, next) => {
//   if (req.secure) {
//     return next();
//   }
//   res.redirect(301, `https://${req.headers.host}${req.url}`);
// });

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/images', express.static('images'));

app.use('/api', auth);
app.use('/api', refreshToken);

app.use('/api', static);
app.use('/api/gallery', gallery);
app.use('/api', slideshow);

// const httpsCredentials = {
//   key: fs.readFileSync(`${process.env.KEY_PATH}`),
//   cert: fs.readFileSync(`${process.env.CERT_PATH}`),
// };
// const httpsServer = https.createServer(httpsCredentials, app);

// httpsServer.listen(process.env.SSL_PORT, () => console.log(`HTTPS Server running on port ${process.env.SSL_PORT}`));
app.listen(process.env.HTTP_PORT, () => console.log(`HTTP server on port ${process.env.HTTP_PORT}`));