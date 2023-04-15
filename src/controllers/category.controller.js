const db = require('../models');
const Category = db.categories;
const Product = db.products;

exports.getAllCategories = async (req, res, next) => {
	try {
		const categories = await Category.findAll({});

		return res.status(200).json({
			message: 'Success',
			data: categories,
		});
	} catch (err) {
		console.log(err);

		return res.status(500).json({
			message: 'Server Error',
		});
	}
};

exports.getAllProductsByCategoryId = async (req, res, next) => {
	const categoryId = req.params.id;
	try {
		const products = await Product.findAll({
			include: [Category],
			where: {
				category_id: categoryId,
			},
		});

		return res.status(200).json({
			message: `All products with category id: ${categoryId}`,
			data: products,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while fetching products by category',
			error: err.message,
		});
	}
};
