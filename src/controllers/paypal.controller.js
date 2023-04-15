// THIS CONTROLLER IS ONLY REQUIRE IF YOU WOULD LIKE TO SERVE THE PAYPAL CHECKOUT PAGE FROM YOUR SERVER
// IF YOU WOULD LIKE TO USE THE PAYPAL CHECKOUT PAGE IN AN SPA, YOU CAN SKIP THIS CONTROLLER
// Importing the required module(s)
const paypal = require('@paypal/checkout-server-sdk');

// Setting up the environment for API calls based on the environment (Production/Sandbox)
const Environment = process.env.NODE_ENV === 'production' ? paypal.core.LiveEnvironment : paypal.core.SandboxEnvironment;

// Creating a new PayPal client using the environment and client ID and secret from the environment variables
const paypalClient = new paypal.core.PayPalHttpClient(new Environment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET));

// Creating a map of store items
const storeItems = new Map([
	[1, {price: 100, name: 'Learn React Today'}],
	[2, {price: 200, name: 'Learn CSS Today'}],
]);

// Exporting a function to render the index page
exports.getIndex = async (req, res, next) => {
	// Rendering the index page with the PayPal client ID passed as a variable
	res.render('index', {paypalClientId: process.env.PAYPAL_CLIENT_ID});
};

// Exporting a function to create a new PayPal order
exports.createOrder = async (req, res, next) => {
	// Creating a new OrdersCreateRequest object
	const request = new paypal.orders.OrdersCreateRequest();

	// Calculating the total price of the order based on the items in the request body
	const total = req.body.items.reduce((sum, item) => {
		return sum + storeItems.get(item.id).price * item.quantity;
	}, 0);

	// Setting the request parameters
	request.prefer('return=representation');
	request.requestBody({
		intent: 'CAPTURE',
		purchase_units: [
			{
				amount: {
					currency_code: 'USD',
					value: total,
					breakdown: {
						item_total: {
							currency_code: 'USD',
							value: total,
						},
					},
				},
				items: req.body.items.map((item) => {
					const storeItem = storeItems.get(item.id);
					return {
						name: storeItem.name,
						unit_amount: {
							currency_code: 'USD',
							value: storeItem.price,
						},
						quantity: item.quantity,
					};
				}),
			},
		],
	});

	try {
		// Executing the request and getting the order details
		const order = await paypalClient.execute(request);
		console.log('Here is your order: ', order);
		// Sending the order ID as a response
		res.json({id: order.result.id});
	} catch (e) {
		// Handling errors and sending an error response
		res.status(500).json({error: e.message});
	}
};
