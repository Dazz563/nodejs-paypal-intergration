const db = require('../models');
const Product = db.products;
const Category = db.categories;
const {Op} = require('sequelize');

exports.addProduct = async (req, res, next) => {
	const {title, price, description, published} = req.body;

	try {
		const newProduct = await Product.create({
			title,
			price,
			description,
			published: published ? published : false,
		});

		return res.status(201).json({
			message: 'Product created!',
			data: newProduct,
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			message: 'An error occurred while creating the product.',
			error: err.message,
		});
	}
};

exports.getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.findAll({
			include: Category,
		});

		return res.status(200).json({
			message: 'All products',
			data: products,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while fetching products',
			error: err.message,
		});
	}
};

exports.getProductById = async (req, res, next) => {
	const id = req.params.id;
	try {
		const product = await Product.findOne({
			where: {
				id: id,
			},
		});

		return res.status(200).json({
			message: `Product with id: ${id}`,
			data: product,
		});
	} catch (err) {
		console.log(err);
		next();
	}
};

exports.updateProduct = async (req, res, next) => {
	const id = req.params.id;
	try {
		const product = await Product.update(req.body, {
			where: {
				id: id,
			},
		});

		return res.status(200).json({
			message: `Product with id: ${id} successfully updated`,
			data: product,
		});
	} catch (err) {
		console.log(err);
		next();
	}
};

exports.deleteProduct = async (req, res, next) => {
	const id = req.params.id;
	try {
		await Product.destroy({
			where: {
				id: id,
			},
		});

		return res.status(200).json({
			message: `Product with id: ${id} successfully deleted`,
		});
	} catch (err) {
		console.log(err);
		next();
	}
};

// product.controller.js

exports.searchProducts = async (req, res, next) => {
	const searchTerm = req.params.term;

	try {
		const products = await Product.findAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.like]: `%${searchTerm}%`,
						},
					},
					{
						description: {
							[Op.like]: `%${searchTerm}%`,
						},
					},
					{
						long_description: {
							[Op.like]: `%${searchTerm}%`,
						},
					},
					{
						price: searchTerm,
					},
				],
			},
			include: Category,
		});

		return res.status(200).json({
			message: `Products found for search term: ${searchTerm}`,
			data: products,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: 'An error occurred while searching products',
			error: err.message,
		});
	}
};
