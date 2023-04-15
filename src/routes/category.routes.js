const {
	getAllCategories, //
	getAllProductsByCategoryId,
} = require('../controllers/category.controller');

const express = require('express');
const categoryRoutes = express.Router();

categoryRoutes.get('/', getAllCategories);
categoryRoutes.get('/:id', getAllProductsByCategoryId);

module.exports = categoryRoutes;
