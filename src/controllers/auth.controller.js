const db = require('../models');
const {hashPassword, comparePasswords} = require('../utils/helpers');
const User = db.users;

// USES SESSION WITHOUT PASSPORT STRATEGY
// exports.login = async (req, res, next) => {
// 	const {email, password} = req.body;

// 	try {
// 		// check if user exists
// 		const user = await User.findOne({where: {email}});
// 		if (!user) {
// 			return res.status(401).json({
// 				error: 'Incorrect Credentials!',
// 			});
// 		}

// 		// check if password is correct
// 		const isMatch = comparePasswords(password, user.password);

// 		if (!isMatch) {
// 			return res.status(401).json({
// 				error: 'Incorrect Credentials!',
// 			});
// 		}

// 		// set session
// 		req.session.user = user;

// 		return res.status(200).json({
// 			message: 'Login successful!',
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({
// 			message: 'An error occurred while logging in the user.',
// 			error: err.message,
// 		});
// 	}
// };

exports.login = async (req, res, next) => {
	res.status(200).json({
		message: 'Login successful!',
	});
};

exports.register = async (req, res, next) => {
	const {username, email, password} = req.body;

	try {
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
