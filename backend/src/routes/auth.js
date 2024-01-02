const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/authController');
const {MiddlewareLogin} = require("../app/middlewares/MiddlewareLogin");

router.post('/login', authController.login);
router.post('/refresh', MiddlewareLogin.verifyToken, authController.refreshToken);
router.post('/logout', MiddlewareLogin.verifyToken, authController.logout);

module.exports = router;