const {
	login, //
	register,
} = require('../controllers/auth.controller');
const passport = require('passport');

const express = require('express');
const authRoutes = express.Router();

authRoutes.post('/login', passport.authenticate('local'), login);
authRoutes.post('/register', register);
// authRoutes.get('/', getAllProducts);
// authRoutes.get('/:id', getProductById);
// authRoutes.put('/:id', updateProduct);
// authRoutes.delete('/:id', deleteProduct);
// authRoutes.get('/search/:term', searchProducts);

module.exports = authRoutes;
