const express = require('express');
const { login, logout, auth } = require('../controllers/auth');

const router = express.Router();

router.post('/login/', login);
router.get('/logout/', logout);
router.get('/authorize_admin/', auth);

module.exports = router;