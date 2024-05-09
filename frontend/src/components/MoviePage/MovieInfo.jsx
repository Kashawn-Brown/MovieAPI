import React, { useState, useEffect } from 'react'
import api from '../../api/axiosConfig'
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from '@mui/material/Rating';

import { faCircleCheck, faBookmark, faHeart, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, FloatingLabel, Form, InputGroup, Tab, Tabs, } from 'react-bootstrap';
import styles from '../../styles/MovieInfo.module.css';



const MovieInfo = ({movie, setError, setHaveError}) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('User')))
    const jwtToken = user?.token;
    
    const movieId = movie.tmdbId;

    // User lists
    const [inWatched, setInWatched] = useState(false)
    const [inWatchlist, setInWatchlist] = useState(false)
    const [inFavourites, setInFavourites] = useState(false)

    const getUserLists = async (source) => {
        try {
            const response6 = await api.get(`/user/inWatched/${movieId}`, {
                cancelToken: source.token,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': jwtToken
                }
            });
            setInWatched(response6.data)
            // console.log(response6.data)

            const response7 = await api.get(`/user/inWatchlist/${movieId}`, {
                cancelToken: source.token,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': jwtToken
                }
            });
            setInWatchlist(response7.data)
            // console.log(response7.data)

            const response8 = await api.get(`/user/inFavourites/${movieId}`, {
                cancelToken: source.token,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': jwtToken
                }
            });
            setInFavourites(response8.data)
            // console.log(response8.data)

        }catch (error) {
            if (axios.isCancel(error)) 
            {
                console.log('Request to get movie canceled', error.message);
            } 
            else 
            {
                console.error(error);
            }
        } 
    }

    // Toggle Buttons
    const toggleWatched = async () => {
        try {
            let response = null;
            if(!inWatched)
            {
                response = await api.post(`/list/addToWatched/${movie.tmdbId}`,{}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': jwtToken // Include your JWT token here
                    }
                });
            }
            else
            {
                response = await api.delete(`/list/removeFromWatched/${movie.tmdbId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': jwtToken // Include your JWT token here
                    }
                });
            }
            console.log(response.data);
            const source = axios.CancelToken.source();
            getUserLists(source);

        }catch (error) {
            setError(error.response.data.message);
            setHaveError(true);
            console.error(error.response.data.message);
        }
    };
    const toggleWatchlist = async () => {
        try {
            let response = null;
            if(!inWatchlist)
            {
                response = await api.post(`/list/addToWatchlist/${movie.tmdbId}`,{}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': jwtToken // Include your JWT token here
                    }
                });
            }
            else
            {
                response = await api.delete(`/list/removeFromWatchlist/${movie.tmdbId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': jwtToken // Include your JWT token here
                    }
                });
            }
            console.log(response.data);
            const source = axios.CancelToken.source();
            getUserLists(source);

        }catch (error) {
            setError(error.response.data.message);
            setHaveError(true);
            console.error(error.response.data.message);
        }
    };
    const toggleFavourites = async () => {
        try {
            let response = null;
            if(!inFavourites)
            {
                response = await api.post(`/list/addToFavourites/${movie.tmdbId}`,{}, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': jwtToken // Include your JWT token here
                    }
                });
            }
            else
            {
                response = await api.delete(`/list/removeFromFavourites/${movie.tmdbId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': jwtToken // Include your JWT token here
                    }
                });
            }
            console.log(response.data);
            const source = axios.CancelToken.source();
            getUserLists(source);

        }catch (error) {
            console.error(error);
            setError(error.response.data.message);
            setHaveError(true);
            console.error(error);
        }
    };
       
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
    }

    useEffect(() => { 
        // When component mounts or updates, cancel previous requests and create a new cancel token
        const source = axios.CancelToken.source();

        if(user) getUserLists(source);

         // Cleanup function to cancel ongoing requests when the component unmounts
         return () => {
            source.cancel('Component unmounted or updated');
        };
        
      }, [])

  return (
    <>
        <div className={styles['movie-info-container']} >
            <div className={styles['movie-poster-container']}>
                <div className={styles['movie-poster']}>
                    <img src={movie.poster} alt={movie.title} className={styles["movie-image"]} />
                </div>
            </div>
            <div className={styles['movie-information-container']}>
                <div className={styles['movie-information']}>
                    <div className={styles['movie-information-title']}>
                        <h2 className={styles['movie-title']}>
                            {movie.title}  
                            <span className={styles["release-year"]}> ({movie.releaseDate.substring(0,4)})</span>{/*Will be movie.year*/} 
                            <span className={styles["movie-status"]}>- {movie?.status}</span>
                        </h2> 
                        <h4 className={styles['movie-release-runtime']}>
                            <span className={styles['realease-date']}>{movie.releaseDate}</span>
                            <span className={styles['dot']}>•</span>
                            <span className={styles['genres']}>
                                {movie.genres.slice(0, 3).map((genre, index) => (
                                    <React.Fragment key={genre.genreId}>
                                        {genre.genre}
                                        {index < 2 && ',  '}
                                    </React.Fragment>
                                ))}
                            </span>
                            <span className={styles['dot']}>•</span>
                            <span className={styles['runtime']}>Runtime: {movie.runtime}min</span>
                            {/* {movie.adult && <span className={styles['dot']}>•</span>} */}
                            {/* {movie.adult && <span className={styles['language']}>Adult</span>} */}
                            <span className={styles['dot']}>•</span>
                            <span className={styles['language']}>[{movie.originalLanguage}]</span>
                        </h4>
                    </div>
                    <div className={styles['movie-information-user-buttons']}>
                        <Button onClick={() => toggleWatched()} id={styles["user-button"]} title='Watched'> <FontAwesomeIcon icon={faCircleCheck} className={styles["icon"]}/> </Button>
                        <Button onClick={() => toggleWatchlist()} id={styles["user-button"]} title='Watchlist'> <FontAwesomeIcon icon={faBookmark}  className={styles["icon"]}/> </Button>
                        <Button onClick={() => toggleFavourites()} id={styles["user-button"]} title='Favourites'> <FontAwesomeIcon icon={faHeart}  className={styles["icon"]}/> </Button>
                        <Button href={movie.trailerLink?.[0]?.key ? `/Trailer/${movie.trailerLink[0].key}` : '#'} id={styles["user-button"]} title='Trailer'> <FontAwesomeIcon icon={faVideo}  className={styles["icon"]}/> </Button>
                    </div>
                    <div className={styles['movie-overview']}>
                        <h3>Overview:</h3>
                        <p>{movie.overview}</p>
                        <br/> <br/> 
                    </div>
                    <div className={styles['movie-information-extra']}>
                                {/* Genres:
                                Adult:
                            - Runtime - Language - Stars  */}
                            Average Rating: 
                            <Rating 
                            className={styles[`average`]} 
                            defaultValue={0}
                            value={movie?.averageRating === -1 ? 0 : movie?.averageRating} 
                            size="medium"
                            readOnly />
                            {`(${movie?.ratings.length})`}
                            <br/>
                            <span className={styles['genres']}>
                                {movie.genres.map((genre, index) => (
                                    <React.Fragment key={genre.genreId}>
                                        {genre.genre}
                                        {index < movie.genres.length - 1 && ', '}
                                    </React.Fragment>
                                ))}
                            </span>
                            <br/>
                            {movie.budget !== -1 && (
                                <span className={styles['budget']}>Budget: ${numberWithCommas(movie.budget)}</span>
                            )}
                            <br/>
                            {movie.revenue !== -1 && (
                                <span className={styles['revenue']}>Revenue: ${numberWithCommas(movie.revenue)}</span>
                            )}

                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MovieInfo