const {
    addProduct, //
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews,
} = require('../controllers/product.controller');

const express = require('express');
const productRoutes = express.Router();

productRoutes.post('/create-product', addProduct);
productRoutes.get('/all-products', getAllProducts);
productRoutes.get('/published-product', getPublishedProduct);
productRoutes.get('/product-reviews/:id', getProductReviews);

productRoutes.get('/:id', getProductById);
productRoutes.put('/:id', updateProduct);
productRoutes.delete('/:id', deleteProduct);

module.exports = productRoutes;
