const allowedOrigins = require('./allowedOrigins');

// Define CORS options object
const corsOptions = {
	// Use a function to dynamically check if the origin is allowed
	origin: function (origin, callback) {
		// If the origin is in the allowedOrigins array or is undefined (e.g. a same-origin request), allow it
		if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			// Otherwise, reject the request with an error
			callback(new Error('Not allowed by CORS'));
		}
	},
	// Set the success status code to 200 (some older browsers have issues with 204)
	optionsSuccessStatus: 200,
};

module.exports = corsOptions;
