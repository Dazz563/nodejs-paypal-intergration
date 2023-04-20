const allowedOrigins = require('../../config/allowedOrigins');

// This is a middleware function that checks the request's origin header
// and sets the Access-Control-Allow-Credentials header in the response
// if the origin is an allowed origin specified in the `allowedOrigins` module.
const credentials = (req, res, next) => {
	// Get the origin from the request headers
	const origin = req.headers.origin;

	// Check if the origin is allowed by checking if it is in the `allowedOrigins` array
	if (allowedOrigins.includes(origin)) {
		// If the origin is allowed, set the Access-Control-Allow-Credentials header to true
		res.header('Access-Control-Allow-Credentials', true);
	}

	// Call the next middleware in the stack
	next();
};

module.exports = credentials;
