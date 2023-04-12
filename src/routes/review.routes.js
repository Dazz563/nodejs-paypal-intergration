const {addReview, getAllReviews} = require('../controllers/review.controller');

const express = require('express');
const reviewtRoutes = express.Router();

reviewtRoutes.post('/create-review', addReview);
reviewtRoutes.get('/all-reviews', getAllReviews);

module.exports = reviewtRoutes;
