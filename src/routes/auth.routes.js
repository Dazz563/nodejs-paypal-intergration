const {
	login, //
	register,
} = require('../controllers/auth.controller');
const express = require('express');
const router = express.Router();

const passport = require('passport');
const authenticate = passport.authenticate('local', {});

router.post('/login', authenticate, login);
router.post('/register', register);
// router.get('/', getAllProducts);
// router.get('/:id', getProductById);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);
// router.get('/search/:term', searchProducts);

module.exports = {authRoutes: router};
