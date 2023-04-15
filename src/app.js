require('dotenv').config({path: '.env'});
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
// npm i rotating-file-stream
const rfs = require('rotating-file-stream');
const morgan = require('morgan');

const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const reviewRoutes = require('./routes/review.routes');
// SKIP THIS ROUTE IF YOU WOULD LIKE TO USE THE PAYPAL CHECKOUT PAGE IN AN SPA
// const paypalRoutes = require('./routes/paypal.routes');

// MIDDLEWARE START
app.set('view engine', 'ejs');

// Setting cors
app.use(
	cors({
		origin: '*',
	})
);

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
	interval: '1d', // rotate daily
	path: path.join(__dirname, 'log'),
});
// setup the logger
morgan.token('host', function (req, res) {
	// morgan token
	return req.hostname;
});
app.use(morgan('combined', {stream: accessLogStream}));

// Parsing JSON & formUrlEncoded
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Serving static files (css, images etc.)
app.use(express.static(path.join('public')));

// SKIP THIS ROUTE IF YOU WOULD LIKE TO USE THE PAYPAL CHECKOUT PAGE IN AN SPA
// app.use('/', paypalRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/review', reviewRoutes);

module.exports = app;
