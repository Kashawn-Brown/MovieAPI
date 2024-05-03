import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: { type: Number, required: true },
    author: { type: String, required: true, default: "Anonymous" },
    heading: {type: String, required: false, default: ""},
    content: {type: String, required: false, default: ""},
    date: {type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    movieInfo: {
        movieId: {type: String, ref: "Movie", required:true},
        movieTitle: {type: String, ref: "Movie", required:true},
        movieYear: {type: Number, ref: "Movie", required:true},
        moviePoster: {type: String, ref: "Movie", required:true}
    }
  })

  const Review = mongoose.model('Review', reviewSchema);


export { reviewSchema };
  export default Review;