import api from '../api/axiosConfig'
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Movie.css';

const Movie = () => {
    const { movieId } = useParams(); // Get the id parameter from the URL     
    const [movie, setMovie] = useState(null);

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
        return  (
            <div>
                Loading...
            </div>
      );
    }


  return (
    <div className='movie-container'>
        <div className='movie-info-container'>
            <div className='movie-poster'>
            <img src={movie.poster} alt={movie.title} className="movie-image" />
            </div>
            <div className='movie-info'>

            </div>
        </div>
        <div className='movie-extra-info-container'>

        </div>
        <div className='movie-review-container'>

        </div>
        Movie
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
