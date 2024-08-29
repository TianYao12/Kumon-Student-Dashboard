const express = require('express');
const { login, auth } = require('../controllers/auth');

const router = express.Router();

router.post('/login', login);
router.get('/isAuthorized', auth);

module.exports = router;