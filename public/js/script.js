paypal
	.Buttons({
		// When the button is clicked, create a new order using the /create-order route and return the order ID
		createOrder: function () {
			return fetch('/create-order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				// Send the order details as a JSON payload
				body: JSON.stringify({
					items: [
						{
							id: 1,
							quantity: 2,
						},
						{
							id: 2,
							quantity: 3,
						},
					],
				}),
			})
				.then((res) => {
					// If the response is OK, parse the response body as JSON and return the order ID
					if (res.ok) return res.json();
					// Otherwise, reject the promise with the JSON error message
					return res.json().then((json) => Promise.reject(json));
				})
				.then(({id}) => {
					return id;
				})
				.catch((e) => {
					// Log any errors to the console
					console.error(e.error);
				});
		},
		// When the payment is approved, capture the payment using the PayPal API
		onApprove: function (data, actions) {
			return actions.order.capture();
		},
	})
	// Render the PayPal button in the element with ID "paypal"
	.render('#paypal');
