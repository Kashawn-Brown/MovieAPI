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

module.exports = router;