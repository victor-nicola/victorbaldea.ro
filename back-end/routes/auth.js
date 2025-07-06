const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');

const PASS_FILE = path.join(__dirname, '../secure/pass');
const TOKENS_FILE = path.join(__dirname, '../secure/tokens');

async function getPassFromFile() {
    try {
        const data = await fs.readFile(PASS_FILE, 'utf8');
        return data;
    } catch (err) {
        return null;
    }
}

async function getTokensFromFile() {
    try {
        const data = await fs.readFile(TOKENS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

async function writeTokensToFile(tokens) {
    try {
        await fs.writeFile(TOKENS_FILE, JSON.stringify(tokens), 'utf8', () => {});
        return 'ok';
    } catch (err) {
        return err.message;
    }
}

router.post('/login', async (req, res) => {
    const storedHash = await getPassFromFile();
    if (!storedHash) return res.status(500).send('Password file not found');

    const valid = await bcrypt.compare(req.body.password, storedHash);
    if (!valid) return res.sendStatus(400);

    // Clean up expired tokens
    const tokens = await getTokensFromFile();
    const refreshTokenArray = [];

    for (const token of tokens) {
        try {
            const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            const { exp } = decoded;
            if (Date.now() < exp * 1000) {
                refreshTokenArray.push(token);
            }
        } catch {
            // skip invalid token
        }
    }

    // Create new tokens
    const accessToken = jwt.sign({ role: 'admin' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
    const refreshToken = jwt.sign({ role: 'admin' }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    refreshTokenArray.push(refreshToken);
    await writeTokensToFile(refreshTokenArray);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false, // true if https
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({accessToken});
});

router.post('/logout', async (req, res) => {
    if (!req.cookies?.refreshToken)
        return res.sendStatus(400);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(400);

    let tokens = await getTokensFromFile();

    if (!tokens.includes(refreshToken)) {
        return res.sendStatus(204); // already logged out
    }

    tokens = tokens.filter(token => token !== refreshToken);
    await writeTokensToFile(tokens);

    res.clearCookie('refreshToken');
    res.sendStatus(204);
});

module.exports = router;
