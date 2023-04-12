const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
// npm i rotating-file-stream
const rfs = require('rotating-file-stream');
const morgan = require('morgan');

const productRoutes = require('./routes/product.routes');
const reviewRoutes = require('./routes/review.routes');

// MIDDLEWARE START

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
// morgan.token('host', function (req, res) { . // morgan token
//     return req.hostname;
// });
app.use(morgan('combined', {stream: accessLogStream}));

// Parsing JSON & formUrlEncoded
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Serving static files (css, images etc.)
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/product', productRoutes);
app.use('/api/review', reviewRoutes);

module.exports = app;
