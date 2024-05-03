import styles from '../styles/Home.module.css';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';
import {Link, useNavigate} from "react-router-dom";

const Home = ({movies}) => {
  // console.log(movies)
  
  
  return (
    <div>
      <div className={styles['movie-carousel-container']}>
        <Carousel>
          {
            // movies?.sort(() => Math.random() - 0.5)
            movies?.slice()?.sort(() => Math.random() - 0.5)?.slice(0,10)?.map((movie) => {
              return(
                <Paper key={movie.tmdbId}>
                  <div className={styles['movie-card-container']}>
                    <div className={styles['movie-card']} style={{ "--img": `url(${movie.backdrop})` }}>
                      <div className={styles['movie-detail']}>
                        <div className={styles['movie-poster']}>
                          <Link to={`/movie/${movie.tmdbId}`}><img src={movie.poster} alt="" /> </Link>
                        </div>
                        <div className={styles['movie-title']}>
                          <h4> {movie.title} </h4>
                          <div className={styles['movie-buttons-container']}>
                          <Link to={movie.trailerLink?.[0]?.key ? `/Trailer/${movie.trailerLink[0].key}` : '#'}>
                              <div className={styles['play-button-icon-container']}>
                                <FontAwesomeIcon className={styles['play-button-icon']} icon={faCirclePlay} />
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className={styles['blank']}>
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              )
            })
          }
        </Carousel>
      </div>
    </div>
  )
}

export default Home