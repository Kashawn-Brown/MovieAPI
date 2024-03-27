import api from '../api/axiosConfig'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/Movie.module.css';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faBookmark, faHeart, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Alert, Button, FloatingLabel, Form, InputGroup, } from 'react-bootstrap';


const Movie = () => {

    const navigate = useNavigate();

    const jwtToken = localStorage.getItem('jwtToken');

    const { movieId } = useParams(); // Get the id parameter from the URL     
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userActive, setUserActive] = useState(false)
    const [user, setUser] = useState(null)
    const [hasReview , setHasReview] = useState(false)
    const [userReview, setUserReview] = useState(null)

    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState('-1');
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [anonymous, setAnonymous] = useState(false);

    const [error, setError] = useState(null);
    const [haveError, setHaveError] = useState(false)

    const getMovie = async (source) =>{

        //Get movie information
        try {

            const response = await api.get(`/api/v1/movies/${movieId}`, { cancelToken: source.token });
            setMovie(response.data)
            // console.log(response.data)

        } catch (error) {
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
    const getReviews = async (source) => {

        // Get all reviews for the movie
        try {

            const response2 = await api.get(`/api/v1/movies/reviews/getReviews/${movieId}`, { cancelToken: source.token });
            setReviews(response2.data)
            // console.log(response2.data)

        } catch (error) {
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
    const getUser = async (source) => {
        // See if user is active
        // try {

        //     const response3 = await api.get(`/api/v1/user/getUserValid`,{
            
        //         cancelToken: source.token,
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'x-auth-token': jwtToken
        //         }
        //     });

        //     if(response3.data === true)
        //     {
        //         setUserActive(true)  
        //     }

        //     // console.log(response3.data)

        // } catch (error) {
        //     if (axios.isCancel(error)) 
        //     {
        //         console.log('Request to get movie canceled', error.message);
        //     } 
        //     else 
        //     {
        //         if(error.response.data.message === "Invalid token.")
        //         {
        //             // Token no longer authorized
        //             localStorage.removeItem('jwtToken');
        //         }
        //         console.error(error);
        //     }
            
        // } 

        // Get active user
        try {
            
            const response4 = await api.get(`api/v1/user/getUser`, {
                
                cancelToken: source.token,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': jwtToken
                }
            });
            setUserActive(true)
            setUser(response4.data)
            setAuthor(response4.data.userName)
            // console.log(author)
            // console.log(user)

        }catch (error) {
            if (axios.isCancel(error)) 
            {
                console.log('Request to get movie canceled', error.message);
            } 
            else 
            {
                if(error.response.data.message === "Invalid token.")
                {
                    // Token no longer authorized
                    localStorage.removeItem('jwtToken');
                }
                console.error(error);
            }

        }

    }
    const getUserReview = async (source) => {

        try {

            const response5 = await api.get(`api/v1/user/getUserReview/${movieId}`, {
                
                cancelToken: source.token,
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': jwtToken
                }
            });

            setHasReview(true)
            setUserReview(response5.data)
            console.log(response5.data)


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
        getUser(source);
        getReviews(source);
        getUserReview(source);

         // Cleanup function to cancel ongoing requests when the component unmounts
         return () => {
            source.cancel('Component unmounted or updated');
        };
        
      }, [])
      
    if (!movie) {
        return (<div>Loading...</div>);
    }

    // console.log(reviewActive)

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
            // console.log(author)
            // console.log(rating)
            // console.log(heading)
            // console.log(content)
            // console.log(movie.tmdbId)
            const response = await api.post(`http://localhost:5000/api/v1/movies/reviews/addReview/${movie.tmdbId}`, {
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
            // console.log(response.data);
            
            const source = axios.CancelToken.source();
            getReviews(source);
    
            } catch (error) {
                setError(error.response.data.message);
                setHaveError(true);
                console.error('Login error:', error);
                // Handle login error (e.g., display error message)
        }
      };
// console.log(anonymous)
// console.log(user?.userName)
    // Function to handle click event on the document
    const handleClick = () => {
        // Remove the error message
        setError('');
        setHaveError(false);
    };

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
                            <h4 className={styles['movie-release']}>
                                {movie.releaseDate}
                            </h4>
                        </div>
                        <div className={styles['movie-information-user-buttons']}>
                            <Button id={styles["user-button"]}> <FontAwesomeIcon icon={faCircleCheck} /> </Button>
                            <Button id={styles["user-button"]}> <FontAwesomeIcon icon={faBookmark}  /> </Button>
                            <Button id={styles["user-button"]}> <FontAwesomeIcon icon={faHeart}  /> </Button>
                            <Button href={`/Trailer/${movie.trailerLink[0].key}`} id={styles["user-button"]}> <FontAwesomeIcon icon={faVideo}  /> </Button>
                            <br/>Watched - Watchlist - Favourite - Trailer<br/> <br/> 
                        </div>
                        <div className={styles['movie-overview']}>
                            <h3>Overview:</h3>
                            <p>{movie.overview}</p>
                            <br/> <br/> 
                        </div>
                        <div className={styles['movie-information-extra']}>
                                <span>{} Genres:</span>
                                <span>{} Adult:</span>
                                - Runtime - Language - Stars (Average Rating)
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
                            <div className={styles['movie-person-container']}>
                                {/* list in her going through each person */}
                            </div>
                        </div>
                    </section>
                    <section className={styles['movie-media']}>
                        <div className={styles['movie-media-menu']}>

                        </div>
                    </section>
                    Cast & Crew - Trailer Links - All Posters/Backdrops - Budget/Revenue 
                </section>
                <section className={styles['review-container']}>
                    <h3>Past Reviews and Ratings - Create Review/Rating</h3>
                    <section className={styles['movie-reviews-container']}>
                        <div className={styles['movie-reviews']}>
                            {movie.reviews.filter((userReview) =>  userReview.review && userReview.review.trim() !== "" && userReview.review !== "N/A")
                            .slice(0,1)
                            .map((userReview) => {
                                if (userReview.review && userReview.review.trim() !== "" && userReview.review !== "N/A") 
                                {
                                    return (
                                        <div className={styles['movie-review']} key={userReview.reviewId}>
                                            <div className={styles['movie-review-heading']}> 
                                                <div className={styles['movie-review-user']}> {userReview.author}</div>
                                                <div className={styles['movie-review-rating']}>
                                                    <Rating name={`${userReview.reviewId}-rating`} value={userReview.rating} readOnly />
                                                </div>
                                                {/* <div className={styles['movie-review-title']}> {userReview.review.header} </div> */}
                                            </div>
                                            <div className={styles['movie-review-content']}> {userReview.review}<br/><br/> </div>
                                        </div>
                                    )}
                                else 
                                {
                                    return null;
                                }
                            })}
                        <Button className={styles['see-all-reviews-button']} onClick={() => navigate(`/movie/${movieId}/reviews`, { state: { reviews: reviews}, replace: true })}>See All Reviews</Button>
                        </div>
                    </section>
                    <section className={styles['create-review-container']}> <br/>
                        <div className={`${styles["login"]} ${!userActive ? styles.active : ''}`} > 
                            <h2>Create Review</h2>
                            <h5><Link to={`/login`} style={{"textDecoration": "none", "color": "inherit"}} title="Go to login page">*You must be logged in to make a review*</Link></h5> 
                        </div>

                        <div className={`${styles["create-review"]} ${(userActive && !hasReview) ? styles.active : ''}`} ><br/>
                            <Form onSubmit={sendReview}>
                            <div className={styles['create-review-user']}>
                                <InputGroup style={{ width: '500px', borderRadius: "0.375rem", backgroundColor: "white"}}>
                                    <div title="Use this to make your review anonymous" style={{ alignSelf: 'center', padding: "0px 12px" }}>
                                        <Form.Check 
                                            type="checkbox" 
                                            onChange={(e) => { setAnonymous(!anonymous); }}
                                        />
                                    </div>
                                    <Form.Control type="text" placeholder={`${anonymous ? "Anonymous" : user?.userName}`} disabled readOnly />
                                </InputGroup>
                            </div>
                            <div className={styles['create-rating']}>
                                <Rating 
                                name="user-rating" 
                                defaultValue={4.5} 
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

                        <div className={`${styles["display-review"]} ${(userActive && hasReview) ? styles.active : ''}`}>
                            USER HAS REVIEW (DISPLAY)
                        </div>
                    </section>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Movie