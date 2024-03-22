import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Movies.css'; // Make sure the path is correct

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
    <div className="movies-container">
      <div className="genre-panel">
        <h2>Genres</h2>
        <ul>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
      <div className="movies-grid">
        {movies?.map((movie) => (
          <div key={movie.tmdbId} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
            <Link to={`/movies/${movie.id}`}>
              <img src={movie.poster} alt={movie.title} className="movie-image" />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.releaseDate}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
