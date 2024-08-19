const { login, logout, auth } = require('../controllers/auth');

const express = require('express');
const router = express.Router();

router.post('/login/', login);
router.get('/logout/', logout);
router.get('/authorize_admin/', auth);

module.exports = router;