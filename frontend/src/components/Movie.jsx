import api from '../api/axiosConfig'
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from '../styles/Movie.module.css';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faBookmark, faHeart, faVideo } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';


const Movie = () => {

    const { movieId } = useParams(); // Get the id parameter from the URL     
    const [movie, setMovie] = useState(null);
    const [userRating, setRating] = useState(-1)

    const getMovie = async () =>{
        try {

            const response = await api.get(`/api/v1/movies/${movieId}`);
            setMovie(response.data)
            console.log(response.data)

        } catch (error) {
            console.log(error);
        } 
    } 
    useEffect(() => {
        getMovie();
      }, [])

    if (!movie) {
        return (<div>Loading...</div>);
    }


  return (
    <div className={styles['movie-container']}>
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
                            <Button id={styles["user-button"]}> <FontAwesomeIcon icon={faVideo}  /> </Button>
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
        <div className='movie-extra-info-container-bg'>
            <section className={styles['movie-extra-info-container']}>
                <section className='movie-cast-and-crew-container'>
                    <div className='movie-cast-and-crew'>
                        <div className='movie-person-container'>
                            {/* list in her going through each person */}
                        </div>
                    </div>
                </section>
                <section className='movie-media'>
                    <div className='movie-media-menu'>

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
                    <Link to={`/movies/${movie.tmdbId}/reviews`}>
                        <button className={styles['see-all-reviews-button']}>See All Reviews</button>
                    </Link>
                    </div>
                </section>
                <section className={styles['create-review-container hide']}>
                    <div className={styles['create-review']}>
                        <div className={styles['create-rating']}>
                            <Rating 
                            name="user-rating" 
                            defaultValue={4.5} 
                            precision={0.5}
                            size="large"
                            onChange={(event, newValue) => {
                                setRating(newValue);
                              }}  
                            />
                        </div>
                        <div className={styles['create-review-user']}>
                            <input type="text" placeholder="Your name" />
                        </div>
                        <div className={styles['create-review-content-container']}>
                            <div className={styles['create-review-heading']}>
                                <input type="text" placeholder="Review title" />
                            </div>
                            <div className={styles['create-review-content']}>
                                <textarea placeholder="Write your review..." />
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    </div>
  )
}

export default Movie





// // import React from 'react';
// import api from '../api/axiosConfig'
// import ReactStars from 'react-rating-stars-component';
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function Movie() {

//     const { movieId } = useParams(); // Get the id parameter from the URL
//     const [movie, setMovie] = useState(null);

    // const getMovie = async () =>{

    //     try {
    //         console.log(movieId)

    //         const response = await api.get(`/api/v1/movies/${movieId}`);
    //         setMovie(response.data)
    //         console.log(response.data)


    //         if (!movie) {
    //             return  (
    //                 <div>
    //                     <Navigation />
    //                     <div>Loading...</div>; // Display a loading message while fetching the book
    //                 </div>
    //           );
    //         }

    //     } catch (error) {
    //         console.log(error);
    //     } 

    // }

    // useEffect(() => {


    //     console.log("getting movies")
    //     getMovie();
    
    //   }, [])


//       return (
//         <div className="movie-container">
//           {movie ? (
//             <>
//               <div className="movie-details">
//                 <h1>{movie.title}</h1>
//                 <p>{movie.overview}</p>
//                 <p>Release Date: {movie.releaseDate}</p>
//                 <p>Status: {movie.status}</p>
//                 <p>Genres: {movie.genres.join(', ')}</p>
//                 <p>Original Language: {movie.originalLanguage}</p>
//                 <p>Adult: {movie.adult ? 'Yes' : 'No'}</p>
//                 <img src={movie.poster} alt={movie.title} />
//               </div>
//               <div className="trailer">
//                 <iframe
//                   width="560"
//                   height="315"
//                   src={`https://www.youtube.com/embed/${movie.trailerLink[0].key}`}
//                   title="YouTube video player"
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//               <div className="ratings">
//                 <h2>Ratings</h2>
//                 <ReactStars
//                   count={5}
//                   value={movie.averageRating}
//                   size={24}
//                   edit={false}
//                   isHalf={true}
//                   emptyIcon={<i className="far fa-star"></i>}
//                   halfIcon={<i className="fa fa-star-half-alt"></i>}
//                   fullIcon={<i className="fa fa-star"></i>}
//                   color="#ffd700"
//                 />
//               </div>
//               <div className="reviews">
//                 <h2>Reviews</h2>
//                 {movie.reviews.map((review) => (
//                   <div key={review.reviewId} className="review">
//                     <p>Rating: {review.rating}</p>
//                     <p>Author: {review.author}</p>
//                     <p>Review: {review.review}</p>
//                     <div className="stars">
//                       {[...Array(5)].map((_, index) => (
//                         <span
//                           key={index}
//                           className={index < review.rating ? 'filled' : ''}
//                         >
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <div>Loading...</div>
//           )}
//         </div>
//       );

// };

// export default Movie;
