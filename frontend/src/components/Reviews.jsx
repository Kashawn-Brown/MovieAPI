import React, { useState } from 'react';
import { Link, useNavigate, useLocation, useParams  } from 'react-router-dom';
import Rating from '@mui/material/Rating';

import styles from '../styles/Reviews.module.css';

const Reviews = () => {

    const location = useLocation();
    // var movies = location.state?.movies;
    var reviews = location.state?.reviews;

    console.log(reviews)
    // const navigate = useNavigate();


  return (
    <div>
        <div className={styles["container"]}>
            <section className={styles["movie-banner"]}>
                <div className={styles["back-button"]}>

                </div>
            </section>
            <section className={styles["reviews"]}>
                {reviews
                ?.map((review) => (
                    <div key={review._id} className={styles["review-container"]}>
                        <div className={styles["review"]}>
                            <span className={styles["author"]}> {`${review.author}`} </span> <br/>
                            <Rating name={`${review._id}-rating`} value={review.rating} readOnly />
                            <span> {`${review.heading}`} </span>
                        </div>
                        
                    </div>
                ))}
            </section>
            <section className={styles["create-review"]}>

            </section>
        </div>
        Reviews

    </div>
  )
}

export default Reviews