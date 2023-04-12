const paypal = require('@paypal/checkout-server-sdk');

const Environment = process.env.NODE_ENV === 'production' ? paypal.core.LiveEnvironment : paypal.core.SandboxEnvironment;
const paypalClient = new paypal.core.PayPalHttpClient(new Environment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET));

const storeItems = new Map([
	[1, {price: 100, name: 'Learn React Today'}],
	[2, {price: 200, name: 'Learn CSS Today'}],
]);

exports.getIndex = async (req, res, next) => {
	res.render('index', {paypalClientId: process.env.PAYPAL_CLIENT_ID});
};

exports.createOrder = async (req, res, next) => {
	const request = new paypal.orders.OrdersCreateRequest();
	const total = req.body.items.reduce((sum, item) => {
		return sum + storeItems.get(item.id).price * item.quantity;
	}, 0);
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
		const order = await paypalClient.execute(request);
		console.log('Here is your order: ', order);
		res.json({id: order.result.id});
	} catch (e) {
		res.status(500).json({error: e.message});
	}
};
