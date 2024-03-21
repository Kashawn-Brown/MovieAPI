const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Movie = require('../models/movieSchema');


router.get('/:id', async (req, res) => {

    try {
        const movieId = req.params.id

        const movie = await Movie.findOne( {tmdbId: movieId} )

        if(!movie)
        {
            return res.status(404).json({message: 'Movie Not found'})
        }

        res.status(200).json(movie.reviews)
        

    }catch (error) {
        console.error(error);
    }

})

router.post('/addReview/:id', async (req, res) => {

    try {
        const movieId = req.params.id

        const { rating, author="", review="", reviewId } = req.body

        if(!rating)
        {
            return res.status(400).json({ message: 'Rating is required' });
        }
        if (isNaN(rating) || rating < 1 || rating > 5) 
        {
            return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
        }

        const movie = await Movie.findOne( {tmdbId: movieId} )

        if(!movie)
        {
            return res.status(404).json({message: 'Movie Not found'})
        }

        // Ensure that reviewId is provided in the request body
        if (!reviewId) {
            return res.status(400).json({ message: 'Review ID is required' });
        }

        // Add the review to the movie's reviews array
        if(author == "" && review == "")
        {
            movie.reviews.push({ rating, reviewId});
        }
        else if(author == "")
        {
            movie.reviews.push({ rating, review, reviewId});
        }
        else if(review == "")
        {
            movie.reviews.push({ rating, author, reviewId});
        }
        else
        {
            movie.reviews.push({ rating, author, review, reviewId});
        }
        

        movie.ratings.push(rating);

        await movie.save();

        res.status(200).json(movie.reviews);
        

    }catch (error) {
        console.error(error);
    }

})



module.exports = router;