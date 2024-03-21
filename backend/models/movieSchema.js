const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema = new Schema({

    tmdbId: { type: String, required: true, unique: true },
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
    ratings: {type: [Number], required: true},
    averageRating: { type: Number, required: true, default: -1 },
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
      rating: { type: Number, required: true },
      author: { type: String, required: true, default: "Anonymous" },
      review: { type: String, required: true, default: "N/A" },
      reviewId: { type: String, required: true },
    }],

});

// With this whenever a new rating is added to the ratings array and the document is saved, 
// the averageRating will be recalculated based on the updated ratings array. 
// If there are no ratings, averageRating will be set back to -1.
movieSchema.pre('save', function(next) 
{
  if (this.ratings.length > 0) 
  {
      const sum = this.ratings.reduce((acc, curr) => acc + curr, 0);
      this.averageRating = (sum / this.ratings.length).toFixed(1);
  } 
  else 
  {
      this.averageRating = -1;
  }
  next();
});



const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
