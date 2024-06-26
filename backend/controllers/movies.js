import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

import Movie from '../models/movieSchema.js';

export const getMovies = async (req, res) => {

    try {
        const movies = await Movie.find();
        res.status(200).json(movies);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const getMovieById = async (req, res) => {

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

}

export const getMoviesByGenre = async (req, res) => {

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

}

export const getMoviesByGenres = async (req, res) => {

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

}

export const getMoviesByStatus = async (req, res) => {

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

}

export const getMoviesByYear = async (req, res) => {

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

}
