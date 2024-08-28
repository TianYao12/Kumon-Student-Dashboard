require('dotenv').config();

const auth = async (req, res) => {
    if (req.session.isAuthenticated) {
        return res.status(200).send({ message: "Authorized" });
    } 
    res.status(401).send({ error: "Unauthorized" });
};

const login = async (req, res) => {
    const { password } = req.body;
    try {
        if (password === process.env.PASSWORD) {
            req.session.isAuthenticated = true;
            await req.session.save();
            res.status(200).json({ message: "Logged in!" });
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
