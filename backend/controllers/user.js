import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

import Movie from '../models/movieSchema.js';
import Review from '../models/reviewSchema.js';
import User from '../models/userSchema.js';


export const getUser = async (req, res) => {

    try {
        const userId = req.user.userId;
        const user = await User.findOne({ _id: userId });

        if(!user) return res.status(404).json({message: 'User Not found'})
        
        res.status(200).json(user);

    }catch (error) {
        console.error(error);
    }

}
export const getUserValid = async (req, res) => {

    try {
        return res.status(200).json(true)

    }catch (error) {
        console.error(error);
    }

}

export const getUserReview = async (req, res) => {

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

}

export const inWatched = async (req, res) => {

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

}
export const inWatchlist = async (req, res) => {

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

}
export const inFavourites = async (req, res) => {

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

}
