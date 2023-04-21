const {
	getOrdersByUserId, //
} = require('../controllers/order.controller');
const express = require('express');
const {verifyJWT} = require('../middleware/verifyJWT');
const router = express.Router();

// Apply middleware to all routes
router.use(verifyJWT);

// private routes
router.get('/:id', getOrdersByUserId);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

module.exports = {orderRoutes: router};
