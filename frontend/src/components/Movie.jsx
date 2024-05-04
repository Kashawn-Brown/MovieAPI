import api from '../api/axiosConfig'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/Movie.module.css';
import Rating from '@mui/material/Rating';
import { Alert, Button, FloatingLabel, Form, InputGroup, Tab, Tabs, } from 'react-bootstrap';
import MovieInfo from './MoviePage/MovieInfo'
import CastCrew from './MoviePage/CastCrew'
import MovieMedia from './MoviePage/MovieMedia'


const Movie = () => {

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
    const [haveError, setHaveError] = useState(false)

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

    // Function to handle click event on the document
    const handleClick = () => {
        // Remove the error message
        setError('');
        setHaveError(false);
    };

    if (!movie) 
    {
        return (<div>Loading...</div>);
    }
    return (
    <div className={styles['movie-container']} onClick={haveError ? handleClick : null}>
        <div className={styles["error-div"]}> {error && <Alert id={styles["error"]}>{error}</Alert>} </div>
        <div className={styles["movie-info-container-bg"]} style={{"backgroundImage": `url(${movie.backdrop})`}}>
            <MovieInfo movie={movie} />
        </div>
        <div className={styles['movie-info-p2-container-bg']}>
            <div className={styles['movie-info-p2-container']}>
                {/* <section className={styles['movie-extra-info-container']}> */}
                <CastCrew movie={movie} setError={setError} setHaveError={setHaveError} />
                {/* </section> */}
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
                                <h5>
                                    <Link to={`/login`} style={{"textDecoration": "none", "color": "inherit"}} title="Go to login page">*You must be logged in to make a review*</Link>
                                </h5> 
                            </div>

                            <div className={`${styles["create-review"]} ${(user && !hasReview) ? styles.active : ''}`} ><br/>
                                <Form onSubmit={sendReview}>
                                    <div className={styles['create-review-user']}>
                                        <InputGroup style={{ width: '700px', borderRadius: "0.375rem", backgroundColor: "white"}}>
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
                                        size="large"
                                        onChange={(e, newValue) => { setRating(newValue); }}  
                                        /> <br/>
                                    </div>
                                    <div className={styles['create-review-content-container']}>
                                        <div className={styles['create-review-heading']}>
                                            {/* <input type="text" placeholder="" /> */}
                                            <Form.Control type="text" placeholder="Review headline" style={{ width: '700px' }} value={heading} onChange={(e) => setHeading(e.target.value)}/> <br/>
                                        </div>
                                        <div className={styles['create-review-content']}>
                                            {/* <textarea placeholder="Write your review..." /> */}
                                            <FloatingLabel
                                                controlId="floatingTextarea"
                                                label="Write your review...">
                                                <Form.Control as="textarea" label="Write your review..." style={{ height: '100px', width: '700px' }} value={content} onChange={(e) => setContent(e.target.value)}/>
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
                    <MovieMedia movie={movie} />
                </section>
            </div>
        </div>
    </div>
  )
}

export default Movie