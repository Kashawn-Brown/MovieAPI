import express from 'express';
const router = express.Router();

import { authenticateToken } from '../routes/authorizationMiddleware.js';

import { getWatchlist, addToWatchlist, removeFromWatchlist, getWatched, addToWatched, removeFromWatched, getFavourites, addToFavourites, removeFromFavourites, } from '../controllers/lists.js'

// Get all movies in Users watchlist
router.get('/getWatchlist/', authenticateToken, getWatchlist)

// Add to watchlist
router.post('/addToWatchlist/:id', authenticateToken, addToWatchlist)

// Remove from watchlist
router.delete('/removeFromWatchlist/:id', authenticateToken, removeFromWatchlist)


// Get all movies watched by User
router.get('/getWatched/', authenticateToken, getWatched)

// Add Movie to list of movies watched by User
router.post('/addToWatched/:id', authenticateToken, addToWatched)

// Remove Movie from list of movies watched by User
router.delete('/removeFromWatched/:id', authenticateToken, removeFromWatched)


// Get all movies in Users favourites
router.get('/getFavourites/', authenticateToken, getFavourites)

// Add to User favourites
router.post('/addToFavourites/:id', authenticateToken, addToFavourites)

// Remove from Users favourites
router.delete('/removeFromFavourites/:id', authenticateToken, removeFromFavourites)









export default router;