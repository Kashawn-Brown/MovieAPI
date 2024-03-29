import './App.css';
import api from './api/axiosConfig'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  const getMovies = async (source) =>{

    try{

      const response = await api.get("/api/v1/movies", { cancelToken: source.token });

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
    console.log("using")
    // When component mounts or updates, cancel previous requests and create a new cancel token
    const source = axios.CancelToken.source();
    // console.log("getting movies")
    getMovies(source);



    // Cleanup function to cancel ongoing requests when the component unmounts
    return () => {
      source.cancel('Component unmounted or updated');
  };

  }, [])

  useEffect(() => {

    const source = axios.CancelToken.source();
      // Your action here
      // console.log('Location changed:', location.pathname);

      const checkAuthentication = async () => {
        // Logic to check if the user is authenticated
        // This could be based on a valid token existence and validity
        try {
            const jwtToken = localStorage.getItem('jwtToken');
            if (jwtToken) {
                const response = await api.get(`/api/v1/user/getUserValid`, {
                  cancelToken: source.token, 
                  headers: {
                      'Content-Type': 'application/json',
                      'x-auth-token': jwtToken
                  }
                });
                setIsAuthenticated(response.data === true);
            }
        } catch (error) {
            console.error('Error checking authentication:', error);
            setIsAuthenticated(false);
        }
    };
    
    checkAuthentication();
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    setIsAuthenticated(false);
    // Additional logout logic
  };




  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
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
