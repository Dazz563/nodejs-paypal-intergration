const {
	login, //
	register,
	refreshToken,
	logout,
} = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/refresh-token', refreshToken);
router.delete('/logout', logout);

module.exports = {authRoutes: router};
