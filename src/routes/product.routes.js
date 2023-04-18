const {
	addProduct, //
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
	searchProducts,
} = require('../controllers/product.controller');
const express = require('express');
const {requireAuth} = require('../utils/helpers');
const router = express.Router();

// public routes
router.get('/', requireAuth, getAllProducts);
router.get('/:id', getProductById);
router.get('/search/:term', searchProducts);

// private routes
router.post('/', requireAuth, addProduct);
router.put('/:id', requireAuth, updateProduct);
router.delete('/:id', requireAuth, deleteProduct);

module.exports = {productRoutes: router};
