require('dotenv').config();

const session = require('express-session');
const express = require('express');
const app = express();
app.use(express.json());

app.use(session({
    key: "sessionId",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000, 
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
    }
}));

const auth = async (req, res) => {
    if (req.session.isAuthenticated) {
        res.status(200).send({ loggedIn: true });
    } else {
        res.status(200).send({ loggedIn: false });
    }
};

const login = async (req, res) => {
    const { password } = req.body;
    try {
        if (password === process.env.PASSWORD) {
            req.session.isAuthenticated = true;
            await req.session.save((err) => {
                if (err) {
                    console.error('Session save error:', err);
                    return res.status(500).json({ message: "Internal Server Error" });
                }
                console.log('Session after login:', req.session);
                res.status(200).json({ message: "Logged in!" });
            });
        } else {
            res.status(400).json({ message: "Incorrect Password" });
        }
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};

const logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
            }
            res.clearCookie('sessionId');
            res.status(200).json({ message: "Logged Out!" });
        });
    } catch (error) {
        res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};

module.exports = {
    auth,
    login,
    logout
};
