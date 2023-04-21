const db = require('../models');
const {Op} = require('sequelize');
const User = db.users;

exports.getUserById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const user = await User.findByPk(id, {
			attributes: {exclude: ['password', 'refreshToken']},
		});

		return res.status(200).json({
			message: `User with id: ${id}`,
			data: user,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while fetching user',
			error: err.message,
		});
	}
};

exports.getAllUsers = async (req, res, next) => {};
