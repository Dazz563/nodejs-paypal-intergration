const {
	getIndex, //
	createOrder,
} = require('../controllers/paypal.controller');

const express = require('express');
const paypalRoutes = express.Router();

paypalRoutes.get('/', getIndex);
paypalRoutes.post('/create-order', createOrder);

module.exports = paypalRoutes;
