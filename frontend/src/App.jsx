import './App.css';
import api from './api/axiosConfig'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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

  const getMovies = async () =>{

    try{

      const response = await api.get("/api/v1/movies");

      setMovies(response.data)

    } catch (error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    // console.log("getting movies")
    getMovies();

  }, [])






  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={ <Layout/> } >
          <Route path="/" element={ <Home movies={movies} /> } />
          <Route path="/login" element={ <Login/> } />
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
