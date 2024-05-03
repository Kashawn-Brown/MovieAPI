import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';

import Movie from '../models/movieSchema.js';
import Review from '../models/reviewSchema.js';
import User from '../models/userSchema.js';

export const getReviews = async (req, res) => {

    try {
        const movieId = req.params.id

        const reviews = await Review.find({ "movieInfo.movieId": movieId });
        // console.log(reviews)

        if(reviews.length === 0)
        {
            return res.status(404).json({message: `There have been no reviews of the movie with id ${movieId}`})
        }

        res.status(200).json(reviews)
        

    }catch (error) {
        console.error(error);
    }

}

export const getUserReview = async (req, res) => {

    try {

        const userId = req.user.userId;
        const movieId = req.params.id

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

export const addReview = async (req, res) => {

    try {
        const movieId = req.params.id
        const userId = req.user.userId; //userId=new mongoose.Types.ObjectId("6600a743c9b792b75eb20b1a") 

        const { rating, author, heading="", content=""} = req.body

        const movie = await Movie.findOne({ tmdbId: movieId });
        
        const user = await User.findOne({ _id: userId });

        if(!movie)
        {
            return res.status(404).json({message: 'Movie Not found'})
        }        
        const movieInfo = {movieId: movie.tmdbId, movieTitle: movie.title, movieYear: movie.releaseYear, moviePoster: movie.poster}
        
        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }

        const existingReview = await Review.findOne({ "movieInfo.movieId": movieId, userId });

        if (existingReview) 
        {
            return res.status(400).json({ message: 'You have already reviewed this movie' });
        }

        // Making sure review isn't made with heading and no content
        if(!(heading == "") && content == "")
        {
            return res.status(400).json({message: 'Cannot make review with only a heading'})
        }

        // Adding new review to the database with all the information (references not needed because all the names match exactly)
        const newReview = new Review({ rating, author, heading, content, userId, movieInfo });
        await newReview.save();

        movie.ratings.push(rating);
        movie.reviews.push(newReview._id)
        user.reviews.push({reviewId: newReview._id, movieId: movie.tmdbId})
        
        await movie.save();
        await user.save();

        res.status(201).json({message: "Your review has been created and saved"});
        

    }catch (error) {
        console.error(error);
    }

}

export const deleteReview = async (req, res) => {

    try {
        const movieId = req.params.id
        const userId = req.user.userId; //userId=new mongoose.Types.ObjectId("6600a743c9b792b75eb20b1a") 

        const movie = await Movie.findOne({ tmdbId: movieId });
        
        const user = await User.findOne({ _id: userId });

        if(!movie)
        {
            return res.status(404).json({message: 'Movie Not found'})
        }        
        
        if(!user)
        {
            return res.status(404).json({message: 'User Not found'})
        }

        const existingReview = await Review.findOne({ "movieInfo.movieId": movieId, userId });

        if (!existingReview) 
        {
            return res.status(400).json({ message: 'You have not reviewed this movie' });
        }

        // Remove the review from the Movie document's reviews array
        // Assuming movie.reviews is an array of review IDs
        const reviewIndexInMovie = movie.reviews.findIndex(reviewId => reviewId.equals(existingReview._id));
        if (reviewIndexInMovie > -1) {
            movie.ratings.splice(reviewIndexInMovie, 1);
            movie.reviews.splice(reviewIndexInMovie, 1);
            await movie.save();
        }

        // If you're keeping a list or average of ratings in the Movie document, update that here as well

        // Remove the review ID from the User document's reviewIds array
        const reviewIndexInUser = user.reviewIds.findIndex(reviewId => reviewId.equals(existingReview._id));
        if (reviewIndexInUser > -1) {
            user.reviewIds.splice(reviewIndexInUser, 1);
            await user.save();
        }


        // Adding new review to the database with all the information (references not needed because all the names match exactly)
        await Review.deleteOne({ _id: existingReview._id })

        res.status(200).json({ message: "Your review has been deleted" });
        

    }catch (error) {
        console.error(error);
    }

}

export const getUserReviews = async (req, res) => {

    try {
        const userId = req.user.userId;

        const reviews = await Review.find({ "userId": userId });
        // console.log(reviews)

        if(reviews.length === 0)
        {
            return res.status(404).json({message: `The user has no reviews to display`})
        }
        res.status(200).json(reviews)

    }catch (error) {
        console.error(error);
    }

}