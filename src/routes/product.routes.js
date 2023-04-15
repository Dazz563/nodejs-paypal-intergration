const {
	addProduct, //
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
	searchProducts,
} = require('../controllers/product.controller');

const express = require('express');
const productRoutes = express.Router();

productRoutes.post('/', addProduct);
productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getProductById);
productRoutes.put('/:id', updateProduct);
productRoutes.delete('/:id', deleteProduct);
productRoutes.get('/search/:term', searchProducts);

module.exports = productRoutes;
