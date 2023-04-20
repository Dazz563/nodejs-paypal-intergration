require('dotenv').config();
// const db = require('../models');
const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) return res.status(401).json({error: 'No token provided'});
	// console.log(authHeader);

	const token = authHeader.split(' ')[1];
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err)
			return res.status(403).json({
				message: 'Invalid token',
				error: 'Invalid token',
			}); // invalid token
		req.user = user;
		next();
	});
};
