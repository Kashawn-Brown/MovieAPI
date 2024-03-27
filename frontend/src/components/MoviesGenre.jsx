import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams  } from 'react-router-dom';
import styles from '../styles/Movies.module.css';

const MoviesGenre = () => {
    // console.log(movies)
    const location = useLocation();
    var movies = location.state?.movies;
    var allGenres = location.state?.allGenres;
    
    const  currentGenre  = useParams().genre;
    // console.log(currentGenre)

    const navigate = useNavigate();

// console.log(allGenres)


const handleGenreClick = async (genre) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/movies/genre/${genre.genre}`);
      const data = await response.json();
    //   console.log(data)
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
            <li key={genre.genreId} onClick={() => handleGenreClick(genre)} style={{ fontWeight: genre.genre === currentGenre ? 'bold' : 'normal' }}>
                {genre.genre}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles['movies']}>
      <div className={styles['movies-grid']}>
        {movies?.map((movie) => (
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
      </div>
    </div>
  );
};

export default MoviesGenre;
