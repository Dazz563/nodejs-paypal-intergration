const {
	addProduct, //
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
	searchProducts,
} = require('../controllers/product.controller');
const express = require('express');
const {verifyJWT} = require('../middleware/verifyJWT');
const router = express.Router();

// public routes
router.get('/', verifyJWT, getAllProducts);
router.get('/:id', getProductById);
router.get('/search/:term', searchProducts);

// private routes
router.post('/', verifyJWT, addProduct);
router.put('/:id', verifyJWT, updateProduct);
router.delete('/:id', verifyJWT, deleteProduct);

module.exports = {productRoutes: router};
