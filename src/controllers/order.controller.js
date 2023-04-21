const db = require('../models');
const {Op} = require('sequelize');
const Order = db.orders;
const User = db.users;
const Product = db.products;

exports.getAllOrders = async (req, res, next) => {};

exports.getOrdersByUserId = async (req, res, next) => {
	const userId = req.params.id;
	try {
		const user = await User.findByPk(userId);
		const orders = await user.getOrders({
			include: [Product],
		});

		return res.status(200).json({
			message: `All orders with user id: ${userId}`,
			data: orders,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while fetching orders by user',
			error: err.message,
		});
	}
};
