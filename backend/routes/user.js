const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Movie = require('../models/movieSchema');
const User = require('../models/userSchema');
const Review = require('../models/reviewSchema');

const { authenticateToken } = require('../routes/authorizationMiddleware');

// Get User watchlist
router.get('/getUser/', authenticateToken, async (req, res) => {

    try {
        
        const userId = req.user.userId;

        const user = await User.findOne({ _id: userId });

        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }


        res.status(200).json(user);

    }catch (error) {
        console.error(error);
    }

})

// Get if User has valid token
router.get('/getUserValid/', authenticateToken, async (req, res) => {

    try {
        
        return res.status(200).json(true)

    }catch (error) {
        console.error(error);
    }

})

// Get a Users Review for a movie
router.get('/getUserReview/:movieId', authenticateToken, async (req, res) => {

    try {

        const userId = req.user.userId;
        const movieId = req.params.movieId

        const review = await Review.findOne({ "userId": userId, "movieInfo.movieId": movieId});

        if(!review)
        {
            return res.status(404).json({message: 'User has not reviewed this movie'})
        }
        
        return res.status(200).json(review)

    }catch (error) {
        console.error(error);
    }

})

// Get if a movie is in a Users Watchlist or not
router.get('/inWatched/:movieId', authenticateToken, async (req, res) => {

    try {

        const userId = req.user.userId;
        const movieId = req.params.movieId

        const user = await User.findOne({ _id: userId });

        const existing = user.watched.some(movieInfo => movieInfo.movieId === movieId);

        if(existing)
        {
            return res.status(200).json(true)
        }

        return res.status(200).json(false)
        
    }catch (error) {
        console.error(error);
    }

})

// Get if a movie is in a Users Watchlist or not
router.get('/inWatchlist/:movieId', authenticateToken, async (req, res) => {

    try {

        const userId = req.user.userId;
        const movieId = req.params.movieId

        const user = await User.findOne({ _id: userId });

        const existing = user.watchlist.some(movieInfo => movieInfo.movieId === movieId);

        if(existing)
        {
            return res.status(200).json(true)
        }

        return res.status(200).json(false)
        
    }catch (error) {
        console.error(error);
    }

})

router.get('/inFavourites/:movieId', authenticateToken, async (req, res) => {

    try {

        const userId = req.user.userId;
        const movieId = req.params.movieId

        const user = await User.findOne({ _id: userId });

        const existing = user.favourites.some(movieInfo => movieInfo.movieId === movieId);

        if(existing)
        {
            return res.status(200).json(true)
        }

        return res.status(200).json(false)
        
    }catch (error) {
        console.error(error);
    }

})


module.exports = router;