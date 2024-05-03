import express from 'express';
const router = express.Router();

import { getMovies, getMovieById, getMoviesByGenre, getMoviesByGenres, getMoviesByStatus, getMoviesByYear,  } from '../controllers/movies.js'

//Get all Movies
router.get('/', getMovies);

// Get a movie by TMDB ID
router.get('/:id', getMovieById)

// Get movies by associated Genre
router.get('/genre/:genre', getMoviesByGenre)

// Get movies by associated Genres
router.get('/genres/:genres', getMoviesByGenres)

// Get movies by status
router.get('/status/:status', getMoviesByStatus)

// Get movies by release year
router.get('/release/:year', getMoviesByYear)



export default router;