import express from 'express';
const router = express.Router();

import { authenticateToken } from '../routes/authorizationMiddleware.js';

import { getReviews, getUserReview, addReview, deleteReview, getUserReviews} from '../controllers/reviews.js'

//Get all reviews for a movie
router.get('/getReviews/:id', getReviews)

//Get review of a movie from a particular User
router.get('/userReview:id', authenticateToken, getUserReview)

// User add review/rating
router.post('/addReview/:id', authenticateToken, addReview)

// User delete review/rating
router.delete('/deleteReview/:id', authenticateToken, deleteReview)

//Get all reviews of a User
router.get('/userReviews', authenticateToken, getUserReviews)

export default router;