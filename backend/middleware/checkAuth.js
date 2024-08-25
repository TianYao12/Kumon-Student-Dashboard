const checkAuth = async (req, res, next) => {
    if (req.session && req.session.isAuthenticated) {
        next();
    } else {
        console.log(req.session)
        return res.status(401).json({error: "Unauthorized access"})
    }
}

module.exports = { checkAuth };