const admin = require('../config/firebaseAdmin')

const auth = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const idToken = authHeader.split(' ')[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken; 
        return res.status(200).send({ message: "Authorized" });
    } catch (error) {
        console.error("Error verifying ID token:", error);
        return res.status(401).send({ error: "Unauthorized" });
    }
};

const login = async (req, res) => {
    const { idToken } = req.body;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;

        return res.status(200).json({ message: "Logged in!", user: decodedToken });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(400).json({ message: "Invalid ID token" });
    }
};

module.exports = {
    auth,
    login
};
