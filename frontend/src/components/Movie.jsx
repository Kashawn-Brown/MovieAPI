import api from '../api/axiosConfig'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/Movie.module.css';
import Rating from '@mui/material/Rating';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faBookmark, faHeart, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, FloatingLabel, Form, InputGroup, Tab, Tabs, } from 'react-bootstrap';
// import Table from 'react-bootstrap/Table';


const Movie = () => {

    const defaultPic = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";
    const navigate = useNavigate();

    const { movieId } = useParams(); // Get the id parameter from the URL     
    const [movie, setMovie] = useState(null);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('User')))
    const jwtToken = user?.token
    const [hasReview , setHasReview] = useState(false)
    const [userReview, setUserReview] = useState(null)
    const [userRating, setUserRating] = useState(-1)

    // User Review
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState(-1);
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [anonymous, setAnonymous] = useState(false);

    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const [haveError, setHaveError] = useState(false)

    // User lists
    const [inWatched, setInWatched] = useState(false)
    const [inWatchlist, setInWatchlist] = useState(false)
    const [inFavourites, setInFavourites] = useState(false)

    const getMovie = async (source) =>{
        //Get movie information
        try {
            const response9 = await api.get(`/movies/${movieId}`, { cancelToken: source.token });
            setMovie(response9.data)
            // console.log(response9.data)
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
                console.error(error.response.data.message);
            }
        } 
    }
    const getUserReview = async (source) => {
        try 
        {
            const response5 = await api.get(`/user/getUserReview/${movieId}`, {
                cancelToken: source.token,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': jwtToken
                }
            });

            setUserReview(response5.data)
            setUserRating(response5.data.rating)
            // console.log(response5.data)
        }catch (error) {
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
    const resetUser = async (source) => {
        try {
            const response4 = await api.get(`/user/getUser`, {
                cancelToken: source.token,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': jwtToken
                }
            });
            const { password, ...updatedUserDetails } = response4.data;
            const updatedUser = { userDetails: updatedUserDetails, token: user.token };

            // Store the updated user object in local storage
            localStorage.setItem('User', JSON.stringify(updatedUser));
            setUser(JSON.parse(localStorage.getItem('User')))
            navigate(0);

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

    useEffect(() => { 
        // When component mounts or updates, cancel previous requests and create a new cancel token
        const source = axios.CancelToken.source();

        getMovie(source);
        if(user)
        {
            getUserLists(source);
            setAuthor(user.userDetails.userName)
            user.userDetails.reviews.forEach(review => {
                if (review.movieId === movieId) 
                {
                    setHasReview(true);
                    getUserReview(source);
                    return;
                }
            });
        }
        
         // Cleanup function to cancel ongoing requests when the component unmounts
         return () => {
            source.cancel('Component unmounted or updated');
        };
        
      }, [])
      
    //Review Controller
    const sendReview = async (e) => {
        e.preventDefault();
        try {
            if(anonymous)
            {
                setAuthor("Anonymous")
            }
            if(rating > 5 || rating <=0)
            {
                setError("Movie rating must be between 0.5 and 5");
                setHaveError(true);
            }
            else
            {
                const response = await api.post(`/movies/reviews/addReview/${movie.tmdbId}`, {
                    author: author,
                    rating: rating,
                    heading: heading,
                    content: content
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': jwtToken // Include your JWT token here
                    }
                });
                console.log(response.data);
                
                const source = axios.CancelToken.source();
                resetUser(source);
            }
    
            } catch (error) {
                setError(error.response.data.message);
                setHaveError(true);
                console.error(error);
                // Handle login error (e.g., display error message)
        }
      };
    const deleteReview = async (e) => {
        e.preventDefault();
        try {
            
            const response = await api.delete(`/movies/reviews/deleteReview/${movie.tmdbId}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': jwtToken // Include your JWT token here
                }
            });
            console.log(response.data);
            
            const source = axios.CancelToken.source();
            resetUser(source);
    
            } catch (error) {
                setError(error.response.data.message);
                setHaveError(true);
                console.error(error.response.data.message);
                // Handle login error (e.g., display error message)
        }

    };

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
            setError(error.response.data.message);
            setHaveError(true);
            console.error(error.response.data.message);
        }
    };    

    // Function to handle click event on the document
    const handleClick = () => {
        // Remove the error message
        setError('');
        setHaveError(false);
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ", ");
    }

    if (!movie) 
    {
        return (<div>Loading...</div>);
    }
    return (
    <div className={styles['movie-container']} onClick={haveError ? handleClick : null}>
        <div className={styles["error-div"]}> {error && <Alert id={styles["error"]}>{error}</Alert>} </div>
        <div className={styles["movie-info-container-bg"]} style={{"backgroundImage": `url(${movie.backdrop})`}}>
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
        </div>
        <div className={styles['movie-info-p2-container-bg']}>
            <div className={styles['movie-info-p2-container']}>
                <section className={styles['movie-extra-info-container']}>
                    <section className={styles['movie-cast-and-crew-container']}>
                        <div className={styles['movie-cast-and-crew']}>
                            <div className={styles['movie-person-scroller']}>
                                <Tabs id={styles['tab-bar']}>
                                    <Tab eventKey="Cast" title="Cast">
                                {/* list in her going through each person */}
                                <ol className={styles['people']}>
                                    {movie.people.cast/*.slice(0,10)*/?.map((person, index) => (
                                        <li key={`${person.actorId}-${index}`} className={styles['person-card']}>
                                             <img
                                                src={person.actorPicture === 'https://image.tmdb.org/t/p/originalnull' ? defaultPic : person.actorPicture}
                                                alt={person.actorName}
                                                className={styles['person-image']}
                                            />
                                            <div className={styles['person-info']}>
                                                <p className={styles['person-name']}> {`${person.actorName}`} </p>
                                                <p className={styles['person-role']}> {`${person.role[0]}`} </p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                                </Tab>
                                <Tab eventKey="Crew" title="Crew">
                                <ol className={styles['people']}>
                                    {movie.people.director.concat(movie.people.screenplay)?.map((person, index) => (
                                        <li key={`${person.directorId || person.screenplayId}-${index}`} className={styles['person-card']}>
                                            <img
                                                src={
                                                    person.directorPicture === 'https://image.tmdb.org/t/p/originalnull' || person.screenplayPicture === 'https://image.tmdb.org/t/p/originalnull'
                                                    ? defaultPic
                                                    : person.directorPicture || person.screenplayPicture
                                                }
                                                alt={
                                                    person.directorName === 'https://image.tmdb.org/t/p/originalnull' || person.screenplayName === 'https://image.tmdb.org/t/p/originalnull'
                                                    ? 'Default Name'
                                                    : person.directorName || person.screenplayName
                                                }
                                                className={styles["person-image"]}
                                            />
                                            <div className={styles['person-info']}>
                                                <p className={styles['person-name']}> {`${person.directorName || person.screenplayName}`} </p>
                                                <p className={styles['person-role']}> {`${person.role[0]}`} </p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                                </Tab>
                                </Tabs>
                            </div>
                        </div>
                    </section>
                    {/* Cast & Crew - Trailer Links - All Posters/Backdrops - Budget/Revenue  */}
                </section>
                <section className={styles['review-container']}>
                    
                    <section className={styles['movie-reviews-container']}>
                        
                        <div className={styles['movie-reviews']}>
                        <h3>Past Reviews and Ratings</h3>
                        <Button className={styles['see-all-reviews-button']} onClick={() => navigate(`/movie/${movieId}/reviews`)}>See All Reviews</Button>
                        </div>
                    </section>
                    <section className={styles['create-review-container']}>
                    <div className={styles['create']}>
                        <div className={`${styles["login"]} ${!user ? styles.active : ''}`} > 
                            <h3>Create Review</h3>
                            <h5><Link to={`/login`} style={{"textDecoration": "none", "color": "inherit"}} title="Go to login page">*You must be logged in to make a review*</Link></h5> 
                        </div>

                        <div className={`${styles["create-review"]} ${(user && !hasReview) ? styles.active : ''}`} ><br/>
                            <Form onSubmit={sendReview}>
                            <div className={styles['create-review-user']}>
                                <InputGroup style={{ width: '500px', borderRadius: "0.375rem", backgroundColor: "white"}}>
                                    <div title="Use this to make your review anonymous" style={{ alignSelf: 'center', padding: "0px 12px" }}>
                                        <Form.Check 
                                            type="checkbox" 
                                            onChange={(e) => { setAnonymous(!anonymous); }}
                                        />
                                    </div>
                                    <Form.Control type="text" placeholder={`${anonymous ? "Anonymous" : author}`} disabled readOnly />
                                </InputGroup>
                            </div>
                            <div className={styles['create-rating']}>
                                <Rating 
                                name="user-rating" 
                                value={4.5} 
                                precision={0.5}
                                size="medium"
                                onChange={(e, newValue) => { setRating(newValue); }}  
                                /> <br/>
                            </div>
                            <div className={styles['create-review-content-container']}>
                                <div className={styles['create-review-heading']}>
                                    {/* <input type="text" placeholder="" /> */}
                                    <Form.Control type="text" placeholder="Review headline" style={{ width: '500px' }} value={heading} onChange={(e) => setHeading(e.target.value)}/> <br/>
                                </div>
                                <div className={styles['create-review-content']}>
                                    {/* <textarea placeholder="Write your review..." /> */}
                                    <FloatingLabel
                                    controlId="floatingTextarea"
                                    label="Write your review...">
                                        <Form.Control as="textarea" label="Write your review..." style={{ height: '100px', width: '500px' }} value={content} onChange={(e) => setContent(e.target.value)}/>
                                    </FloatingLabel>
                                </div>
                            </div> <br/>
                            <Button className={styles['submit-review-button']} type="submit">Submit Review</Button>
                            </Form>
                        </div>

                        <div className={`${styles["display-review"]} ${(user && hasReview) ? styles.active : ''}`}>
                            <div className={styles['user-review-card']}>
                                <span className={styles['your-review']}>Your Review:</span>
                                <div className={styles['user-review-header']}>
                                    <div className={styles['user-review-heading']}>
                                        {`${userReview?.heading}`}
                                        <span className={styles['user-rating-container']}> 
                                            <Rating 
                                            className={`rating`} 
                                            value={userRating} 
                                            size="small" 
                                            readOnly />
                                        </span>
                                    </div>
                                    <div className={styles['review-author']}> 
                                        <span className={styles['by-text']}>by </span> 
                                        {`${userReview?.author}`}
                                        <span className={styles['date-text']}>{`${userReview?.date.split('T')[0]}`}</span>
                                    </div>
                                </div>
                                <div className={styles['user-review-content']}>
                                    {`${userReview?.content}`}
                                </div>
                                <button className={styles['delete-review-btn']} onClick={deleteReview}>
                                    Delete Review
                                </button>
                            </div>
                        </div>
                    </div>
                    </section>
                </section>
                <section className={styles['movie-media']}>
                    <div className={styles['movie-media-menu']}>
                    <div className={styles['media-scroller']}>
                    <Tabs id={styles['tab-bar2']}>
                        <Tab eventKey="Posters" title="Posters">
                            <ol className={styles['media']}>
                                {movie.posters.slice(0,20)?.map((poster) => (
                                    <li key={poster} className={styles['poster-card']}>
                                            <img
                                            src={poster}
                                            className={styles['poster-image']}
                                        />
                                    </li>
                                ))}
                            </ol>
                            (All Posters link)
                        </Tab>
                        <Tab eventKey="Backdrops" title="Backdrops">
                            <ol className={styles['media']}>
                                {movie.backdrops.slice(0,20)?.map((backdrop) => (
                                    <li key={backdrop} className={styles['backdrop-card']}>
                                            <img
                                            src={backdrop}
                                            className={styles['backdrop-image']}
                                        />
                                    </li>
                                ))}
                            </ol>
                            (All Backdrops link)
                        </Tab>
                        <Tab eventKey="Logos" title="Logos">
                            <ol className={styles['media']}>
                                {movie.logos.slice(0,20)?.map((logo) => (
                                    <li key={logo} className={styles['logo-card']}>
                                            <img
                                            src={logo}
                                            className={styles['logo-image']}
                                        />
                                    </li>
                                ))}
                            </ol>
                            (All Logos link)
                        </Tab>
                        <Tab eventKey="Videos" title="Videos">
                             
                        </Tab>
                    </Tabs>
                    </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Movie