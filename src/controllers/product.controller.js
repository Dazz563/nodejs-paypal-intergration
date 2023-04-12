const db = require('../models');
const Product = db.products;
const Review = db.reviews;

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
        console.log(err);
        next();
    }
};

exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll({});

        return res.status(200).json({
            message: 'All products',
            data: products,
        });
    } catch (err) {
        console.log(err);
        next();
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

exports.getPublishedProduct = async (req, res, next) => {
    const id = req.params.id;
    try {
        const products = await Product.findAll({
            where: {
                published: true,
            },
        });

        return res.status(200).json({
            message: `All published products`,
            data: products,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};

exports.getProductReviews = async (req, res, next) => {
    const id = req.params.id;
    try {
        const productReviews = await Product.findAll({
            include: Review,
            where: {
                id: id,
            },
        });

        return res.status(200).json({
            message: `All product reviews`,
            data: productReviews,
        });
    } catch (err) {
        console.log(err);
        next();
    }
};
