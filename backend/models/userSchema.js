import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creation: {type: Date, default: Date.now},
    watched: 
    [{
        // movieInfo:  
        // {
            movieId: {type: String, ref: "Movie", required:true},
            movieTitle: {type: String, ref: "Movie", required:true},
            movieYear: {type: Number, ref: "Movie", required:true},
            moviePoster: {type: String, ref: "Movie", required:true}
        // }
    }],
    watchlist: 
    [{ 
        // movieInfo: 
        // {
            movieId: {type: String, ref: "Movie", required:true},
            movieTitle: {type: String, ref: "Movie", required:true},
            movieYear: {type: Number, ref: "Movie", required:true},
            moviePoster: {type: String, ref: "Movie", required:true}
        // } 
    }],
    favourites: 
    [{ 
        // movieInfo: 
        // {
            movieId: {type: String, ref: "Movie", required:true},
            movieTitle: {type: String, ref: "Movie", required:true},
            movieYear: {type: Number, ref: "Movie", required:true},
            moviePoster: {type: String, ref: "Movie", required:true}
        // }
    }],
    reviews: 
    [{ 
        reviewId: {type: Schema.Types.ObjectId, ref: "Review"},
        movieId: {type: String, ref: "Movie", required:true}
    }]
})

const User = mongoose.model('User', userSchema);

export default User;