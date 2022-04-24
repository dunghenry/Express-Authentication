const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const authController = require('../controllers/authController')
router.post('/auth/register', authController.register);
router.post('/auth/refresh-token', authController.refreshToken);
router.post('/auth/login', authController.login);
router.post('/auth/logout', verifyToken, authController.logout);

module.exports = router;