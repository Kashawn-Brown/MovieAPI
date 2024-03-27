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

// Get User watchlist
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


module.exports = router;