const {
	addReview, //
	getAllReviews,
	getReviewsByProductId,
} = require('../controllers/review.controller');

const express = require('express');
const router = express.Router();

router.get('/', getAllReviews);
router.get('/reviews-by-product/:prodId', getReviewsByProductId);
router.post('/', addReview);

module.exports = {reviewRoutes: router};
