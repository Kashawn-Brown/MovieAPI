import express from 'express';
const router = express.Router();

import { authenticateToken } from '../routes/authorizationMiddleware.js';

import { getUser, getUserValid, getUserReview, inWatched, inWatchlist, inFavourites, } from '../controllers/user.js'

// Get User watchlist
router.get('/getUser/', authenticateToken, getUser)

// Get if User has valid token
router.get('/getUserValid/', authenticateToken, getUserValid)

// Get if User has valid token
router.get('/getUserReview/:movieId', authenticateToken, getUserReview)

// Get if a movie is in a Users Watchlist or not
router.get('/inWatched/:movieId', authenticateToken, inWatched)

// Get if a movie is in a Users Watchlist or not
router.get('/inWatchlist/:movieId', authenticateToken, inWatchlist)

// Get if a movie is in a Users Favourites or not
router.get('/inFavourites/:movieId', authenticateToken, inFavourites)

// // Get a Users Review for a movie
// router.get('/getUserReview/:movieId', authenticateToken, async (req, res) => {

//     try {

//         const userId = req.user.userId;
//         const movieId = req.params.movieId

//         const review = await Review.findOne({ "userId": userId, "movieInfo.movieId": movieId});

//         if(!review)
//         {
//             return res.status(404).json({message: 'User has not reviewed this movie'})
//         }
        
//         return res.status(200).json(review)

//     }catch (error) {
//         console.error(error);
//     }

// })

export default router;