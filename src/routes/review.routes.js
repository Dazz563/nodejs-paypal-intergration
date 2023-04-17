const {
	addReview, //
	getAllReviews,
	getReviewsByProductId,
} = require('../controllers/review.controller');

const express = require('express');
const reviewtRoutes = express.Router();

reviewtRoutes.get('/', getAllReviews);
reviewtRoutes.get('/reviews-by-product/:prodId', getReviewsByProductId);
reviewtRoutes.post('/', addReview);

module.exports = reviewtRoutes;
