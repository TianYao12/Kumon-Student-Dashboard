const session = require('express-session');
const express = require('express');
const app = express();

app.use(express.json());

app.use(session({
    key: "userId",
    secret: "thisismysecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000, 
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    }
}));

const auth = async (req, res) => {
    if (req.session.user) {
        res.status(200).send({ loggedIn: true, user: req.session.user });
    } else {
        res.status(200).send({ loggedIn: false, user: null });
    }
};

const login = async (req, res) => {
    const { password } = req.body;
    try {
        if (password === process.env.PASSWORD) {
            req.session.user = true; 
            res.status(200).json({ message: "Logged in!", user: req.session.user });
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
