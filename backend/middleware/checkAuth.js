const checkAuth = async (req, res, next) => {
    if (req.session && req.session) {
        next();
    } else {
        console.log(req.session)
        return res.status(401).json({error: "Unauthorized access", sessions: req.session});
    }
}

module.exports = { checkAuth };
