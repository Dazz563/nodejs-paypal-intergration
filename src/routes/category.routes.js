const {
	getAllCategories, //
	getAllProductsByCategoryId,
} = require('../controllers/category.controller');

const express = require('express');
const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getAllProductsByCategoryId);

module.exports = {categoryRoutes: router};
