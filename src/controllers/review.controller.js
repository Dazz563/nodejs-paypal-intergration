const db = require('../models');
const Review = db.reviews;
const Product = db.products;

exports.addReview = async (req, res, next) => {
	const {rating, description} = req.body;

	try {
		const newRating = await Review.create({
			rating,
			description,
			productId: 2,
		});

		return res.status(201).json({
			message: 'Review created!',
			data: newRating,
		});
	} catch (err) {
		console.log(err);
		next();
	}
};

exports.getAllReviews = async (req, res, next) => {
	console.log(req.cookies);
	try {
		const reviews = await Review.findAll();

		return res.status(201).json({
			message: 'All reviews',
			data: reviews,
		});
	} catch (err) {
		console.log(err);
		next();
	}
};

exports.getReviewsByProductId = async (req, res, next) => {
	res.cookie('visited', true, {maxAge: 60000});
	const id = req.params.prodId;
	try {
		const product = await db.products.findByPk(1);
		if (!product) return res.status(404).json({message: `Product with id: ${id} not found.`});

		const reviews = await product.getReviews();

		return res.status(200).json({
			message: `Successfully fetched reviews for product with id: ${id}`,
			data: reviews,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while searching reviews',
			error: err.message,
		});
	}
};
