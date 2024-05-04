import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams  } from 'react-router-dom';
import styles from '../styles/Movies.module.css';
import api from '../api/axiosConfig'

const MoviesGenre = () => {
    // console.log(movies)
    const location = useLocation();
    var movies = location.state?.movies;
    var allGenres = location.state?.allGenres;
    
    const  currentGenre  = useParams().genre;
    // console.log(currentGenre)

    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(18);  // Adjust the number of items per page as needed
  
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(movies.length / moviesPerPage); i++) {
        pageNumbers.push(i);
    }
  

    const navigate = useNavigate();

// console.log(allGenres)


const handleGenreClick = async (genre) => {
    try {
      const response = await api.get(`/movies/genre/${genre.genre}`);
      const data = response.data;
    //   console.log(data)
      navigate(`/movies/genre/${genre.genre}`, { state: { movies: data, allGenres }, replace: true });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className={styles['movies-container']}>
      <div className={styles['genre-panel']}>
        <h2> <Link to={`/movies`} style={{ textDecoration: 'none', color: 'inherit' }}>Genres </Link> </h2>
        <ul>
          {allGenres?.map((genre) => (
            <li key={genre.genreId} onClick={() => handleGenreClick(genre)} style={{ fontWeight: genre.genre === currentGenre ? 'bold' : 'normal' }}>
                {genre.genre}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles['movies']}>
      <div className={styles['movies-grid']}>
        {currentMovies?.map((movie) => (
          <div key={movie.tmdbId} className={styles['movie-card']}>
            <Link to={`/movie/${movie.tmdbId}`}>
              <img src={movie.poster} alt={movie.title} className={styles['movie-image']} />
              <div className={styles['movie-info']}>
                <h3 className={styles['title']}>{movie.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <ul className={styles['pagination']}>
          {pageNumbers.map(number => (
            <li key={number} onClick={() => paginate(number)} style={{ fontWeight: number === currentPage ? 'bold' : 'normal' }}>
              {number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoviesGenre;
