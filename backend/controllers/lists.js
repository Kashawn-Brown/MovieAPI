import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

import Movie from '../models/movieSchema.js';
import User from '../models/userSchema.js';

import { authenticateToken } from '../routes/authorizationMiddleware.js';


export const getWatchlist = async (req, res) => {

    try {
        
        const userId = req.user.userId;

        const user = await User.findOne({ _id: userId });

        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }

        if(user.watchlist.length === 0)
        {
            return res.status(404).json({message: 'No movies found in your watchlist'})
        }

        res.status(200).json(user.watchlist);

    }catch (error) {
        console.error(error);
    }

}
export const addToWatchlist = async (req, res) => {

    try {

        const movieId = req.params.id
        const userId = req.user.userId;

        const movie = await Movie.findOne({ tmdbId: movieId });
        const user = await User.findOne({ _id: userId });

        const existing = user.watchlist.some(movieInfo => movieInfo.movieId === movieId);

        if (existing) 
        {
            return res.status(400).json({ message: 'Movie already in watchlist' });
        }

        if(!movie)
        {
            return res.status(404).json({message: 'Movie Not found'})
        }        
        const movieInfo = {movieId: movie.tmdbId, movieTitle: movie.title, movieYear: movie.releaseYear, moviePoster: movie.poster}
        
        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }

        user.watchlist.push(movieInfo);
        await user.save(); // Save the updated user document
        res.status(200).json({ message: "Movie added to watchlist" });



    }catch (error) {
        console.error(error);
    }

}
export const removeFromWatchlist = async (req, res) => {

    try {

        const movieId = req.params.id
        const userId = req.user.userId;


        const user = await User.findOne({ _id: userId });

        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }

        // const existing = user.watchlist.find(item => item.movieId === movieId);
        const existingIndex = user.watchlist.findIndex(movieInfo => movieInfo.movieId === movieId);

        if (existingIndex === -1) 
        {
            return res.status(404).json({ message: 'Movie is not in your watchlist' });
        }
        
        user.watchlist.splice(existingIndex, 1);
        await user.save();

        res.status(200).json({ message: "Movie has been removed from your watchlist" });

    }catch (error) {
        console.error(error);
    }

}
export const getWatched = async (req, res) => {

    try {
        
        const userId = req.user.userId;

        const user = await User.findOne({ _id: userId });

        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }

        if(user.watched.length === 0)
        {
            return res.status(404).json({message: 'You have no watched movies'})
        }

        res.status(200).json(user.watched);

    }catch (error) {
        console.error(error);
    }

}
export const addToWatched = async (req, res) => {

    try {

        const movieId = req.params.id
        const userId = req.user.userId;

        const movie = await Movie.findOne({ tmdbId: movieId });
        const user = await User.findOne({ _id: userId });

        const existing = user.watched.some(movieInfo => movieInfo.movieId === movieId);

        if (existing) 
        {
            return res.status(400).json({ message: 'Movie already in your list of movies watched' });
        }

        if(!movie)
        {
            return res.status(404).json({message: 'Movie Not found'})
        }        
        const movieInfo = {movieId: movie.tmdbId, movieTitle: movie.title, movieYear: movie.releaseYear, moviePoster: movie.poster}
        
        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }

        user.watched.push(movieInfo);
        await user.save(); // Save the updated user document
        res.status(200).json({ message: "Movie added to watched" });



    }catch (error) {
        console.error(error);
    }

}
export const removeFromWatched = async (req, res) => {

    try {

        const movieId = req.params.id
        const userId = req.user.userId;


        const user = await User.findOne({ _id: userId });

        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }

        // const existing = user.watched.find(item => item.movieId === movieId);
        const existingIndex = user.watched.findIndex(movieInfo => movieInfo.movieId === movieId);
        // console.log(existingIndex)

        if (existingIndex === -1) 
        {
            return res.status(404).json({ message: 'Movie is not in your list of watched movies' });
        }
        
        user.watched.splice(existingIndex, 1);
        await user.save();

        res.status(200).json({ message: "Movie has been removed from your watched movies" });

    }catch (error) {
        console.error(error);
    }

}
export const getFavourites = async (req, res) => {

    try {
        
        const userId = req.user.userId;

        const user = await User.findOne({ _id: userId });

        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }

        if(user.favourites.length === 0)
        {
            return res.status(404).json({message: 'No movies found in your favourites'})
        }

        res.status(200).json(user.favourites);

    }catch (error) {
        console.error(error);
    }

}
export const addToFavourites = async (req, res) => {

    try {

        const movieId = req.params.id
        const userId = req.user.userId;

        const movie = await Movie.findOne({ tmdbId: movieId });
        const user = await User.findOne({ _id: userId });

        const existing = user.favourites.some(movieInfo => movieInfo.movieId === movieId);

        if (existing) 
        {
            return res.status(400).json({ message: 'Movie already in favourites' });
        }

        if(!movie)
        {
            return res.status(404).json({message: 'Movie Not found'})
        }        
        const movieInfo = {movieId: movie.tmdbId, movieTitle: movie.title, movieYear: movie.releaseYear, moviePoster: movie.poster}


        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }

        user.favourites.push(movieInfo);
        await user.save(); // Save the updated user document
        res.status(200).json({ message: "Movie added to favourites" });



    }catch (error) {
        console.error(error);
    }

}
export const removeFromFavourites = async (req, res) => {

    try {

        const movieId = req.params.id
        const userId = req.user.userId;


        const user = await User.findOne({ _id: userId });

        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }

        // const existing = user.favourites.find(item => item.movieId === movieId);
        const existingIndex = user.favourites.findIndex(movieInfo => movieInfo.movieId === movieId);

        if (existingIndex === -1) 
        {
            return res.status(404).json({ message: 'Movie is not in your favourites' });
        }
        
        user.favourites.splice(existingIndex, 1);
        await user.save();

        res.status(200).json({ message: "Movie has been removed from your favourites" });

    }catch (error) {
        console.error(error);
    }

}
