const {addReview, getAllReviews} = require('../controllers/review.controller');

const express = require('express');
const reviewtRoutes = express.Router();

reviewtRoutes.get('/', getAllReviews);
reviewtRoutes.post('/', addReview);

module.exports = reviewtRoutes;
