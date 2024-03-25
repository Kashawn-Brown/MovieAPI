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

// Get a movie by TMDB ID
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

// Get movies by associated Genre
router.get('/genre/:genre', async (req, res) => {

    try {
        const genre = req.params.genre

        const movies = await Movie.find( {"genres.genre": {$in: genre} } )

        if(movies.length == 0)
        {
            return res.status(404).json({message: 'No movies found in this genre'})
        }

        res.status(200).json(movies)
        // res.status(200).json({count: movies.length, movies: movies})
        

    }catch (error) {
        console.error(error);
    }

})

// Get movies by associated Genres
router.get('/genres/:genres', async (req, res) => {

    try {
        const genres = req.params.genres.split('-'); // Split genres by comma

        const movies = await Movie.find( {"genres.genre": {$in: genres} } )

        if(movies.length == 0)
        {
            return res.status(404).json({message: 'No movies found in these genre'})
        }

        res.status(200).json(movies)
        // res.status(200).json({count: movies.length, movies: movies})
        

    }catch (error) {
        console.error(error);
    }

})

// Get movies by status
router.get('/status/:status', async (req, res) => {

    try {
        const status = req.params.status

        const movies = await Movie.find( {"status": status } )

        if(movies.length == 0)
        {
            return res.status(404).json({message: `No movies with the status: "${status}"  found`})
        }

        res.status(200).json(movies)
        // res.status(200).json({count: movies.length, movies: movies})
        

    }catch (error) {
        console.error(error);
    }

})

// Get movies by release year
router.get('/release/:year', async (req, res) => {

    try {
        const year = parseInt(req.params.year, 10)

        const movies = await Movie.find( {"releaseYear": year } )

        if(movies.length == 0)
        {
            return res.status(404).json({message: `No movies found released in the year "${year}"`})
        }
        
        res.status(200).json(movies)
        // res.status(200).json({count: movies.length, movies: movies})
        

    }catch (error) {
        console.error(error);
    }

})



module.exports = router;