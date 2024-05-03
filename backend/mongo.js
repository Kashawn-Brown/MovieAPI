import mongoose from 'mongoose';
import axios from 'axios';
// Getting access to .env file
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

// Retrieving sensitive information from .env file
const apiKey = process.env.API_KEY;
const user = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const cluster = process.env.MONGO_CLUSTER
const database = process.env.MONGO_DATABASE

// Building mongoDb URI
const mongodbURI = `mongodb+srv://${user}:${password}@${cluster}/${database}`
console.log(mongodbURI)



// Connect to MongoDB
mongoose.connect(mongodbURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


// Use Schema set up for storing the Movies in database
import Movie from './models/movieSchema.js';


//Function to get all the movies I will have in my catalog
async function getMovies()
{
  try
  {
    // Removing any movies currently in my database to repopulate
    //  await Movie.deleteMany({}) // Later will iplement no movies to be removed, but only adding movies that are new to the response (1)
    //  console.log('Existing Movies deleted from MongoDB'); // (1)

    // Setting the configurations for my Get request (Getting the current list of the most popular movies)
    const movieOptions = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + apiKey
      }
    };

    // Making the request and putting into a response variable
    const response = await axios.request(movieOptions);
    // console.log(response)

    // Getting all "The Movie Database" Ids of the movies that will be stored 
    const movies = response.data.results.map(item => {
      return { tmdbId: item.id };

    });



    for (let movie of movies) {
      const movieInfo = await getMoviesInfo(movie);
      const moviePeople = await getMoviesPeople(movie);
      const movieTrailer = await getMoviesTrailer(movie);
      const moviePictures = await getMoviesPictures(movie);
      Object.assign(movie, movieInfo, moviePeople, movieTrailer, moviePictures);
    }

    console.log(movies);


    // Testing implementations using just the first movie in response
    // const movieInfo = await getMoviesInfo(movies[0]);
    // const moviePeople = await getMoviesPeople(movies[0]);
    // const movieTrailer = await getMoviesTrailer(movies[0]);
    // const moviePictures = await getMoviesPictures(movies[0]);
    // Object.assign(movies[0], movieInfo, moviePeople, movieTrailer, moviePictures);

    // console.log(movies[0])
    // console.log(movies[0].people.cast)

    // const movieInfo1 = await getMoviesInfo(movies[1]);
    // const moviePeople1 = await getMoviesPeople(movies[1]);
    // const movieTrailer1 = await getMoviesTrailer(movies[1]);
    // const moviePictures1 = await getMoviesPictures(movies[1]);
    // Object.assign(movies[1], movieInfo1, moviePeople1, movieTrailer1, moviePictures1);

    // console.log(movies[1])

    // const movieInfo2 = await getMoviesInfo(movies[2]);
    // const moviePeople2 = await getMoviesPeople(movies[2]);
    // const movieTrailer2 = await getMoviesTrailer(movies[2]);
    // const moviePictures2 = await getMoviesPictures(movies[2]);
    // Object.assign(movies[2], movieInfo2, moviePeople2, movieTrailer2, moviePictures2);

    // console.log(movies[2])
    // console.log(movies.splice(0,3))


    await Movie.insertMany(movies, { timeout: 30000 })
    console.log("Movies stored in MongoDB")

    // Add movies to the database if they do not exist
    // await addNewMovies(movies); // (1)



  } catch (error) {
    console.error('Error:', error);
  }

}

// Function that will allow only new movies to be added to the database, rather tha having all movies removed then repopulated
async function addNewMovies(movies)
{
  try {

    // Find all existing movies in the database. Include only the tmdbId and title of each movie currently in database
    const allMovies = await Movie.find({}, { tmdbId: 1, title: 1 });
    // console.log("Movies in Database")
    // console.log(allMovies)

    // Extract the tmdbIds from movies already in the database 
    const allMovieIds = allMovies.map(existingMovies => existingMovies.tmdbId);
    // console.log("EXISTING TMDB IDS")
    // console.log(allMovieIds)

    // Filter movies to only include those not in the database
    const moviesToAdd =   movies.filter(movie => !allMovieIds.includes(movie.tmdbId.toString()));

    // // Add the new movies to the database
    if (moviesToAdd.length > 0) 
    {
      await Movie.insertMany(moviesToAdd);
      console.log(`${moviesToAdd.length} movies added to the database.`);
    } 
    else 
    {
      console.log('No new movies to add.');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}



async function getMoviesInfo(movie) 
{
  const movieInfoOptions = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movie.tmdbId}?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + apiKey    
    }
  };

  try {
    const response = await axios.request(movieInfoOptions);
    // console.log(response.data);
    let movieData = response.data
    // const genres = movieData.genres.map(genre => genre.name);
    const baseImageURL = "https://image.tmdb.org/t/p/original"
    
    // Setting up release date
    let releaseDate = null
    let releaseYear = -1
    if(movieData.release_date)
    {
      const release = new Date(movieData.release_date);
      releaseDate = release.toLocaleDateString();
      releaseYear = release.getFullYear()
    }

    
    
    const movieInfo = {
      title: movieData.title,
      overview: movieData.overview,
      releaseDate: releaseDate,
      releaseYear: releaseYear,
      status: movieData.status,
      genres: [],
      poster: baseImageURL + movieData.poster_path,
      backdrop: baseImageURL + movieData.backdrop_path,
      originalLanguage: movieData.original_language,
      runtime: movieData.runtime,
      adult: movieData.adult,
      budget: movieData.budget,
      revenue: movieData.revenue
    }

    movieData.genres.forEach(genre => {
      movieInfo.genres.push({genreId: genre.id, genre: genre.name});
    });

    // {
    //   genreId: movieData.genres.id,
    //   genre: movieData.genres.name
    // }

    return movieInfo
    
  } catch (error) {
    console.error(error);
  }
}

async function getMoviesPeople(movie) 
{
  const moviePeopleOptions = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movie.tmdbId}/credits?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + apiKey    
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
      people: 
      {
        director: [],
        screenplay: [],
        cast: []
      }
    }


    const directors = crew.filter(person => person.department === "Directing");
    // Add directors to moviePeople
    directors.forEach(director => {
      moviePeople.people.director.push({
        directorId: director.id,
        directorName: director.name,
        directorPicture: baseImageURL + director.profile_path, // Add picture URL if available
        role: director.job
      });
    });

    const screenwriters = crew.filter(person => person.department === "Writing");
    // Add screenwriters to moviePeople
    screenwriters.forEach(screenwriter => {
      moviePeople.people.screenplay.push({
        screenplayId: screenwriter.id,
        screenplayName: screenwriter.name,
        screenplayPicture: baseImageURL + screenwriter.profile_path, // Add picture URL if available
        role: screenwriter.job
      });
    });

    const actors = cast.filter(actor => actor.order <= 20 && actor.known_for_department === "Acting");
    // Add filtered actors to moviePeople
    actors.forEach(actor => {
      moviePeople.people.cast.push({
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
async function getMoviesTrailer(movie) 
{
  const movieTrailerOptions = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movie.tmdbId}/videos?language=en-US`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + apiKey    
    }
  };

  try {
    const response = await axios.request(movieTrailerOptions);
    // console.log(response.data);
    let movieData = response.data.results

    // console.log(movieData)

    const trailerLinks ={ 
      trailerLink: [],
      videos: []
    } 
    
    const trailers = movieData.filter(video => video.type === "Trailer" && video.site === "YouTube");

    trailers.forEach(trailer => {
      trailerLinks.trailerLink.push({
        site: trailer.site,
        key: trailer.key,
        id: trailer.id, 
        type: trailer.type,
        name: trailer.name
      });
    });

    const vids = movieData.filter(video => video.site === "YouTube");

    vids.forEach(vid => {
      trailerLinks.videos.push({
        site: vid.site,
        key: vid.key,
        id: vid.id, 
        type: vid.type,
        name: vid.name
      });
    });

      return trailerLinks
      


    
    
  } catch (error) {
    console.error(error);
  }
}

async function getMoviesPictures(movie) 
{
  const moviePictureOptions = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movie.tmdbId}/images`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + apiKey    
    }
  };

  try {
    const response = await axios.request(moviePictureOptions);
    // console.log(response.data);
    let movieData = response.data
    const baseImageURL = "https://image.tmdb.org/t/p/original"

    const resp = {
      posters: [],
      backdrops: [],
      logos: []
    }


    // console.log(movieData.backdrops)
    const postersResponse = movieData.posters;
    const backdropsResponse = movieData.backdrops;
    const logosResponse = movieData.logos;

    postersResponse.forEach(poster => {
      resp.posters.push(baseImageURL + poster.file_path);
    });
    backdropsResponse.forEach(backdrop => {
      resp.backdrops.push(baseImageURL + backdrop.file_path);
    });
    logosResponse.forEach(logo => {
      resp.logos.push(baseImageURL + logo.file_path);
    });



      return resp
  
  } catch (error) {
    console.error(error);
  }
}






getMovies();

