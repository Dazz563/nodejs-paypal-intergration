const db = require('../models');
const {Op} = require('sequelize');
const Order = db.orders;
const User = db.users;
const Product = db.products;

exports.getAllOrders = async (req, res, next) => {};

exports.addOrder = async (req, res, next) => {
	const order = req.body;
	console.log(order);
	try {
		const newOrder = await Order.create({
			quantity: order.quantity,
			user_id: order.userId,
			product_id: order.productId,
		});

		// get product associated with order
		const product = await newOrder.getProduct();

		return res.status(201).json({
			message: 'Order has been created',
			data: {...newOrder.toJSON(), product},
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while creating order',
			error: err.message,
		});
	}
};

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

exports.deleteOrderById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const order = await Order.findByPk(id);
		await order.destroy();

		return res.status(204).json({
			message: `Order with id: ${id} has been deleted`,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while deleting order',
			error: err.message,
		});
	}
};

exports.updateOrderById = async (req, res, next) => {
	const id = req.params.id;
	const updatedOrder = req.body;
	try {
		const order = await Order.findByPk(id);
		await order.update(updatedOrder);

		return res.status(200).json({
			message: `Order with id: ${id} has been updated`,
			data: order,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while updating order',
			error: err.message,
		});
	}
};
