const {
	getIndex, //
	createOrder,
} = require('../controllers/paypal.controller');

const express = require('express');
const paypalRoutes = express.Router();

// SKIP THIS ROUTE IF YOU WOULD LIKE TO USE THE PAYPAL CHECKOUT PAGE IN AN SPA
// paypalRoutes.get('/', getIndex);
// paypalRoutes.post('/create-order', createOrder);

module.exports = paypalRoutes;
