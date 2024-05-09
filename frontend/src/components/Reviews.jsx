import api from '../api/axiosConfig'
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, useParams  } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import styles from '../styles/Reviews.module.css';

const Reviews = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState(null);

    useEffect(() => { 

        const fetchMovieAndReviews = async () => {
            //Get movie information
            try {

                const movieResponse  = await api.get(`/movies/${movieId}`);
                setMovie(movieResponse .data)
                // console.log(response.data)

                const reviewsResponse = await api.get(`/movies/reviews/getReviews/${movieId}`);
                setReviews(reviewsResponse.data);

            } catch (error) {
                console.error('Failed to fetch data', error);
            } 
        }
        fetchMovieAndReviews()
        
      }, [movieId])


  return (
    <div>
        <div className={styles["container"]}>
            <section className={styles["movie-banner"]}>
                <div className={styles["movie-poster"]}>
                <Link to={`/movie/${movie?.tmdbId}`}><img src={movie?.poster} alt={movie?.title} className={styles["movie-image"]} /> </Link>
                </div>
                <div className={styles['movie-title-back']}>
                    <div className={styles['movie-title']}>
                        <Link to={`/movie/${movie?.tmdbId}`} style={{"textDecoration": "none", "color": "inherit", "fontWeight": "bold"}} >
                            <h1 className={styles['title']}>
                                {`${movie?.title}`}
                                <span className={styles['year']}> 
                                    {`(${movie?.releaseYear})`} 
                                </span>
                            </h1> 
                        </Link>
                    </div>
                    <div className={styles['back-button']}>
                        <Link to={`/movie/${movie?.tmdbId}`} style={{"textDecoration": "none", "color": "inherit", "fontWeight": "bold"}} >
                            <FontAwesomeIcon icon={faArrowLeft} /> 
                            <span className={styles['back-text']}> Back to movie page</span>
                        </Link>
                    </div>

                </div>
            </section>
            <section className={styles["reviews"]}>
                {reviews?.filter((review) => review.content && review.content.trim() !== "")
                ?.map((review) => (
                    <div className={`${styles["display-review"]}`} key={review._id}>
                        <div className={styles['user-review-card']}>
                            <div className={styles['user-review-header']}>
                                <div className={styles['user-review-heading']}>
                                    {`${review?.heading}`}
                                    <span className={styles['user-rating-container']}> 
                                        <Rating 
                                        className={styles[`rating`]} 
                                        value={review?.rating} 
                                        size="small" 
                                        readOnly />
                                    </span>
                                </div>
                                <div className={styles['review-author']}> 
                                    <span className={styles['by-text']}>by </span> 
                                    {`${review?.author}`}
                                    <span className={styles['date-text']}>{`${review?.date.split('T')[0]}`}</span>
                                </div>
                            </div>
                            <div className={styles['user-review-content']}>
                                {`${review?.content}`}
                            </div>
                        </div>
                    </div>
                    
                ))}
            </section>
            <section className={styles["create-review"]}>
            
            </section>
        </div>
    </div>
  )
}

export default Reviews