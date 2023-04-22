require('dotenv').config({path: '../.env'});
const db = require('../models');
const jwt = require('jsonwebtoken');

const {hashPassword, comparePasswords} = require('../utils/helpers');
const User = db.users;

exports.register = async (req, res, next) => {
	try {
		const {username, email, password} = req.body;
		const user = await User.findOne({where: {email}});

		if (user) {
			return res.status(400).json({
				error: 'User with this email already exists!',
			});
		}

		const hashedPassword = await hashPassword(password);

		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			message: 'User created!',
			data: newUser,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while registering the user.',
			error: err.message,
		});
	}
};

exports.login = async (req, res, next) => {
	const {email, password} = req.body;

	try {
		// check if user exists
		const user = await User.findOne({where: {email}});
		if (!user || !password) {
			return res.status(400).json({
				error: 'Credentials are required!',
			});
		}

		// check if password is correct
		const isMatch = comparePasswords(password, user.password);

		if (!isMatch) {
			return res.status(401).json({
				error: 'Incorrect Credentials!',
			});
		}

		// create access token
		const accessToken = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			process.env.ACCESS_TOKEN_SECRET,
			{expiresIn: '1h'}
		);

		// create refresh token
		const refreshToken = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			process.env.REFRESH_TOKEN_SECRET,
			{expiresIn: '7d'}
		);

		// store refresh token in db (allows us to revoke refresh tokens for logout)
		user.refreshToken = refreshToken;
		await user.save();

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		});

		let returnedUser = user.toJSON();
		delete returnedUser.refreshToken;
		delete returnedUser.password;

		return res.status(200).json({
			message: 'Login successful!',
			accessToken,
			data: returnedUser,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while logging in the user.',
			error: err.message,
		});
	}
};

exports.refreshToken = async (req, res, next) => {
	try {
		const cookies = req.cookies;
		// check if refresh token exists
		if (!cookies?.jwt) return res.sendStatus(401); // unauthorized
		const refreshToken = cookies.jwt;

		// check if user exists
		const user = await User.findOne({where: {refreshToken}});
		if (!user) return res.sendStatus(403); // forbidden

		// verify refresh token
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
			if (err) return res.sendStatus(403); // forbidden
			const accessToken = jwt.sign(
				{
					id: user.id,
					email: user.email,
				},
				process.env.ACCESS_TOKEN_SECRET,
				{expiresIn: '1h'}
			);
			return res.json(accessToken);
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while logging in the user.',
			error: err.message,
		});
	}
};

exports.logout = async (req, res, next) => {
	// On client also delete the access token from local storage
	try {
		const cookies = req.cookies;
		// console.log(cookies);

		// check if refresh token exists
		if (!cookies?.jwt) return res.sendStatus(204); // not content
		const refreshToken = cookies.jwt;

		// is refresh token in db?
		const user = await User.findOne({where: {refreshToken}});
		if (!user) {
			res.clearCookie('jwt', {
				httpOnly: true,
				sameSite: 'none',
				secure: true,
				maxAge: 24 * 60 * 60 * 1000, // 1 day
			});
			return res.sendStatus(204); // not content
		}

		// delete refresh token from db
		user.refreshToken = null;
		await user.save();

		res.clearCookie('jwt', {
			httpOnly: true,
			sameSite: 'none',
			secure: true,
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		});

		return res.sendStatus(204); // not content
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while logging in the user.',
			error: err.message,
		});
	}
};
