import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Movies.module.css';

const Movies = ({ movies }) => {
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    // Add more genres as needed
  ];

  const handleMovieClick = (movieId) => {
    // Redirect to the movie details page
    // For example, if using React Router:
    // history.push(`/movies/${movieId}`);
  };

  return (
    <div className={styles['movies-container']}>
      <div className={styles['genre-panel']}>
        <h2>Genres</h2>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
      <div className={styles['movies']}>
      <div className={styles['movies-grid']}>
        {movies?.map((movie) => (
          <div key={movie.tmdbId} className={styles['movie-card']} onClick={() => handleMovieClick(movie.tmdbId)}>
            <Link to={`/movies/${movie.tmdbId}`}>
              <img src={movie.poster} alt={movie.title} className={styles['movie-image']} />
              <div className={styles['movie-info']}>
                <h3 className={styles['title']}>{movie.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Movies;
