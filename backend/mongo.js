const mongoose = require('mongoose');
const axios = require('axios');
const express = require('express');


// Connect to MongoDB
mongoose.connect('mongodb+srv://csKash:KBrown24$@cluster0.6zzrech.mongodb.net/movie-api-db');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


// Use Schema set up for storing the Movies in database
const Movie = require('./models/movieSchema');

//Function to get all the movies I will have in my catalog
async function getMovies()
{
  try
  {
    // Removing any movies currently in my database to repopulate
    await Movie.deleteMany({})
    console.log('Existing Movies deleted from MongoDB');

    // Setting the configurations for my Get request
    const movieOptions = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODNhNzNhYzJiZGY2NzkxMDc0NmNiZTcyZTZiOWQ3ZCIsInN1YiI6IjY1ZmE0OTgyM2ZlMTYwMDE3ZGYyZmVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nyylRGgK9AFIfsG88db_jgSt9pYNcuXATtM1F1u21ww'
      }
    };

    // Making the request and putting into a response variable
    const response = await axios.request(movieOptions);

    // Getting all "The Movie Database" Ids of the movies that will be stored 
    const movies = response.data.results.map(item => {
      return { tmdbId: item.id };

    });

    console.log(movies);


    for (let movie of movies) {
      const movieInfo = await getMoviesInfo(movie);
      const moviePeople = await getMoviesPeople(movie);
      const movieTrailer = await getMoviesTrailer(movie);
      Object.assign(movie, movieInfo, moviePeople, movieTrailer, {averageRating: -1});
    }

    console.log(movies);


    // const movieInfo = await getMoviesInfo(movies[0]);
    // const moviePeople = await getMoviesPeople(movies[0]);
    // const movieTrailer = await getMoviesTrailer(movies[0]);
    // Object.assign(movies[0], movieInfo, moviePeople, movieTrailer);

    // console.log(movies[0])
    // console.log(movies[0].moreInfo.cast)


    await Movie.insertMany(movies)
    console.log("Movies stored in MongoDB")



  } catch (error) {
    console.error('Error:', error);
  }

}



const getMoviesInfo = async (movie) => {
  const movieInfoOptions = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movie.tmdbId}?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODNhNzNhYzJiZGY2NzkxMDc0NmNiZTcyZTZiOWQ3ZCIsInN1YiI6IjY1ZmE0OTgyM2ZlMTYwMDE3ZGYyZmVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nyylRGgK9AFIfsG88db_jgSt9pYNcuXATtM1F1u21ww'
    }
  };

  try {
    const response = await axios.request(movieInfoOptions);
    // console.log(response.data);
    let movieData = response.data
    const genres = movieData.genres.map(genre => genre.name);
    const baseImageURL = "https://image.tmdb.org/t/p/original"
    
    const movieInfo = {
      title: movieData.title,
      overview: movieData.overview,
      releaseDate: movieData.release_date,
      status: movieData.status,
      genres: genres,
      poster: baseImageURL + movieData.poster_path,
      backdrop: baseImageURL + movieData.backdrop_path,
      originalLanguage: movieData.original_language,
      adult: movieData.adult,
    }

    return movieInfo
    
  } catch (error) {
    console.error(error);
  }
}


const getMoviesPeople = async (movie) => {
  const moviePeopleOptions = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movie.tmdbId}/credits?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODNhNzNhYzJiZGY2NzkxMDc0NmNiZTcyZTZiOWQ3ZCIsInN1YiI6IjY1ZmE0OTgyM2ZlMTYwMDE3ZGYyZmVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nyylRGgK9AFIfsG88db_jgSt9pYNcuXATtM1F1u21ww'
    }
  };

  try {
    const response = await axios.request(moviePeopleOptions);
    // console.log(response.data);
    let cast = response.data.cast
    let crew = response.data.crew
    // console.log(cast)
    // console.log(cast.filter(person => person.job === "Screenplay"))
    const baseImageURL = "https://image.tmdb.org/t/p/original"
    
    const moviePeople = {
      moreInfo: 
      {
        director: [],
        screenplay: [],
        cast: []
      }
    }


    const directors = crew.filter(person => person.department === "Directing");
    // Add directors to moviePeople
    directors.forEach(director => {
      moviePeople.moreInfo.director.push({
        directorId: director.id,
        directorName: director.name,
        directorPicture: baseImageURL + director.profile_path, // Add picture URL if available
        role: director.job
      });
    });

    const screenwriters = crew.filter(person => person.department === "Writing");
    // Add screenwriters to moviePeople
    screenwriters.forEach(screenwriter => {
      moviePeople.moreInfo.screenplay.push({
        screenplayId: screenwriter.id,
        screenplayName: screenwriter.name,
        screenplayPicture: baseImageURL + screenwriter.profile_path, // Add picture URL if available
        role: screenwriter.job
      });
    });

    const actors = cast.filter(actor => actor.order <= 10 && actor.known_for_department === "Acting");
    // Add filtered actors to moviePeople
    actors.forEach(actor => {
      moviePeople.moreInfo.cast.push({
        actorId: actor.id,
        actorName: actor.name,
        actorPicture: baseImageURL + actor.profile_path, // Add picture URL if available
        role: actor.character
      });
    });


    return moviePeople
    
    
  } catch (error) {
    console.error(error);
  }
}


// Have to find out how to determine which trailer for those with multiple
const getMoviesTrailer = async (movie) => {
  const movieTrailerOptions = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movie.tmdbId}/videos?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODNhNzNhYzJiZGY2NzkxMDc0NmNiZTcyZTZiOWQ3ZCIsInN1YiI6IjY1ZmE0OTgyM2ZlMTYwMDE3ZGYyZmVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nyylRGgK9AFIfsG88db_jgSt9pYNcuXATtM1F1u21ww'
    }
  };

  try {
    const response = await axios.request(movieTrailerOptions);
    // console.log(response.data);
    let movieData = response.data.results
    const baseImageURL = "https://image.tmdb.org/t/p/original"

    // console.log(movieData)

    trailerLinks ={ 
      trailerLink: []
    } 
    
    const trailers = movieData.filter(video => video.type === "Trailer");

    trailers.forEach(trailer => {
      trailerLinks.trailerLink.push({
        site: trailer.site,
        key: trailer.key,
        id: trailer.id, 
        type: trailer.type,
        name: trailer.name
      });
    });

      return trailerLinks
      


    
    
  } catch (error) {
    console.error(error);
  }
}




getMovies()



      // averageRating: { type: Number, required: false, default: null },

      // reviews: 
      // [{ 
      //   rating: { type: String, required: true },
      //   author: { type: String, required: false },
      //   review: { type: String, required: false },
      //   reviewId: { type: String, required: true },
      // }],