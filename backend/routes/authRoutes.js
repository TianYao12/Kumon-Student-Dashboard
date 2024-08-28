const express = require('express');
const { login, logout, auth } = require('../controllers/auth');
const { checkAuth } = require("../middleware/checkAuth");

const router = express.Router();

router.post('/login', login);
router.post('/logout', checkAuth, logout);
router.get('/isAuthorized', auth);

module.exports = router;