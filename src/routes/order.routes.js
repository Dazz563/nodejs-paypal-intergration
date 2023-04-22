const {
	getOrdersByUserId, //
	deleteOrderById,
	updateOrderById,
	addOrder,
} = require('../controllers/order.controller');
const express = require('express');
const {verifyJWT} = require('../middleware/verifyJWT');
const router = express.Router();

// Apply middleware to all routes
router.use(verifyJWT);

// private routes
router.post('/', addOrder);
router.get('/:id', getOrdersByUserId);
router.delete('/:id', deleteOrderById);
router.patch('/:id', updateOrderById);

module.exports = {orderRoutes: router};
