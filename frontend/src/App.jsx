import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from './api/axiosConfig'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Layout from './components/Layout'
import Home from './components/Home'
import Header from './components/Header'
import Movies from './components/Movies'
import MoviesGenre from './components/MoviesGenre'
import Movie from './components/Movie'
import Trailer from './components/Trailer'
import Reviews from './components/Reviews'
import Login from './components/Login'
import NotFound from './components/NotFound'

function App() {

  const [movies, setMovies] = useState();
  const user = JSON.parse(localStorage.getItem('User'))

  
  const getMovies = async (source) => {
    try
    {
      const response = await api.get("/movies", { cancelToken: source.token });

      setMovies(response.data)

    } catch (error) {
      if (axios.isCancel(error)) 
      {
          console.log('Request to get movie canceled', error.message);
      } 
      else 
      {
          console.error(error.response.data.message);
      }
    } 
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    getMovies(source);

    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      source.cancel('Component unmounted or updated');
  };

  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={ <Layout/> } >
          <Route path="/" element={ <Home movies={movies} /> } />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/movies" element={ <Movies movies={movies} /> } />
          <Route path="/movies/genre/:genre" element={ <MoviesGenre/> } />
          <Route path="/movie/:movieId" element={ <Movie/> } />
          <Route path="/movie/:movieId/reviews" element={ <Reviews/> } />
          <Route path="/Trailer/:trailerKey" element={ <Trailer/> } />
          <Route path="*" element={ <NotFound/> } />
        </Route>
      </Routes>
      
    </div>
  );
}

export default App;
