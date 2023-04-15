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

// exports.getProductReviews = async (req, res, next) => {
// 	const id = req.params.id;
// 	try {
// 		const productReviews = await Product.findAll({
// 			include: Review,
// 			where: {
// 				id: id,
// 			},
// 		});

// 		return res.status(200).json({
// 			message: `All product reviews`,
// 			data: productReviews,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 		next();
// 	}
// };
