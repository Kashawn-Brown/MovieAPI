const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema = new Schema({

    tmdbId: { type: String, required: true },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    status: { type: String, required: true },
    genres: { type: [String], required: true },
    poster: { type: String, required: true },
    backdrop: { type: String, required: true },
    originalLanguage: { type: String, required: false },
    adult: { type: Boolean, required: false, default: false },    
    trailerLink: 
    [{ 
      site: {type: String, required: true },
      key: {type: String, required: true },
      id: {type: String, required: true },
      type: {type: String, required: true },
      name: {type: String, required: true },
    }],
    averageRating: { type: Number, required: true, default: null },
    moreInfo: 
    {
      director: [{
        directorId: { type: String, required: true },
        directorName: { type: String, required: true },
        directorPicture: { type: String },
        role: { type: [String] }
      }],
      screenplay: [{
        screenplayId: { type: String, required: true },
        screenplayName: { type: String, required: true },
        screenplayPicture: { type: String },
        role: { type: [String] }
      }],
      cast: [{
        actorId: { type: String, required: true },
        actorName: { type: String, required: true },
        actorPicture: { type: String },
        role: { type: [String] }
      }]
    },
    reviews: 
    [{ 
      rating: { type: String, required: true },
      author: { type: String, required: false },
      review: { type: String, required: false },
      reviewId: { type: String, required: true },
    }],

});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
