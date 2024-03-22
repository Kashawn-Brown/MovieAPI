import '../styles/Home.css';
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
      <div className='movie-carousel-container'>
        <Carousel>
          {
            movies/*?.slice(0,1)*/?.map((movie) => {
              return(
                <Paper key={movie.tmdbId}>
                  <div className = 'movie-card-container'>
                    <div className = 'movie-card' style={{"--img": `url(${movie.backdrop})`}}>
                      <div className = 'movie-detail'>
                        <div className = 'movie-poster'>
                          <img src={movie.poster} alt ="" />
                        </div> 
                        <div className = 'movie-title'>
                          <h4> {movie.title} </h4>
                          <div className="movie-buttons-container">
                          <Link to={`/Trailer/${movie.trailerLink[0].key}`}>
                            <div className="play-button-icon-container">
                              <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                            </div>
                          </Link>
                        </div>
                        </div>
                        <div className="blank">
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
      <div className="movies-list">
        Featured Movies here
      </div>
    </div>
  )
}

export default Home