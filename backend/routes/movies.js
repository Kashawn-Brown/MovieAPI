const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Movie = require('../models/movieSchema');

//Get all Movies
router.get('/', async (req, res) => {

    try {
        const movies = await Movie.find();
        res.status(200).json(movies);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
      
});

router.get('/:id', async (req, res) => {

    try {
        const movieId = req.params.id

        const movie = await Movie.findOne( {tmdbId: movieId} )

        if(!movie)
        {
            return res.status(404).json({message: 'Movie Not found'})
        }

        res.status(200).json(movie)
        

    }catch (error) {
        console.error(error);
    }

})

router.get('/genre/:genre', async (req, res) => {

    try {
        const genre = req.params.genre

        const movie = await Movie.find( {genres: {$in: genre} } )

        if(movie.length == 0)
        {
            return res.status(404).json({message: 'No movies found in this genre'})
        }

        res.status(200).json(movie)
        

    }catch (error) {
        console.error(error);
    }

})

router.get('/status/:status', async (req, res) => {

    try {
        const status = req.params.status

        const movie = await Movie.find( {status: status } )

        if(movie.length == 0)
        {
            return res.status(404).json({message: `No movies with the status: "${status}"  found`})
        }

        res.status(200).json(movie)
        

    }catch (error) {
        console.error(error);
    }

})



module.exports = router;