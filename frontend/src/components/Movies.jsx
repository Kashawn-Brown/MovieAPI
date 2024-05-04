import React, { useState } from 'react';
import { Link, useNavigate, useLocation  } from 'react-router-dom';
import styles from '../styles/Movies.module.css';
import api from '../api/axiosConfig'

const Movies = ({movies}) => {
  // console.log(movies)

  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(18);  // Adjust the number of items per page as needed

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(movies?.length / moviesPerPage); i++) {
      pageNumbers.push(i);
  }

  const navigate = useNavigate();


  // Extract all genres from movies and flatten the array
  const allGenres = movies?.reduce((genres, movie) => {
      movie.genres.forEach(genre => {
          if (!genres.some(existingGenre => existingGenre.genreId === genre.genreId)) 
          {
              genres.push({ genreId: genre.genreId, genre: genre.genre });
          }
      });
      return genres.sort((a, b) => a.genre.localeCompare(b.genre));;
  }, []);

// console.log(allGenres)

  const handleGenreClick = async (genre) => {
    try {
      // console.log(genre.genre)
      const response = await api.get(`/movies/genre/${genre.genre}`);
      const data = response.data;
      // console.log(data)
      navigate(`/movies/genre/${genre.genre}`, { state: { movies: data, allGenres }, replace: true });
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  return (
    <div className={styles['movies-container']}>
      <div className={styles['genre-panel']}>
        <h2>Genres</h2>
        <ul>
          {allGenres?.map((genre) => (
            <li key={genre.genreId} onClick={() => handleGenreClick(genre)}>
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

export default Movies;
