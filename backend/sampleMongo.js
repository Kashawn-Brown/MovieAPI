// A getMovies that will handle more than one request
async function getMovies() {
    try {
      // Array to store movies from all pages
      let allMovies = [];
  
      // Loop over the desired range of pages (e.g., 1 to 3)
      for (let page = 1; page <= 3; page++) {
        // Setting the configurations for the Get request (Getting the current list of the most popular movies)
        const movieOptions = {
          method: 'GET',
          url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ***'
          }
        };
  
        // Making the request and putting into a response variable
        const response = await axios.request(movieOptions);
  
        // Getting all "The Movie Database" Ids of the movies that will be stored
        const movies = response.data.results.map(item => {
          return { tmdbId: item.id };
        });
  
        // Add movies from this page to the allMovies array
        allMovies = [...allMovies, ...movies];
      }
  
      for (let movie of allMovies) {
        const movieInfo = await getMoviesInfo(movie);
        const moviePeople = await getMoviesPeople(movie);
        const movieTrailer = await getMoviesTrailer(movie);
        Object.assign(movie, movieInfo, moviePeople, movieTrailer);
      }
  
      // Add movies to the database if they do not exist
      await addMoviesIfNotExist(allMovies);
  
      console.log("Movies stored in MongoDB");
  
    } catch (error) {
      console.error('Error:', error);
    }
  }
  