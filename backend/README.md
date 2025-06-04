# MovieAPI Backend

The server-side implementation of the MovieAPI project, built with Node.js, Express, and MongoDB. This backend provides RESTful API endpoints for movie management, user authentication, and user-specific features.

## Features

- **Movie Management**
  - Fetch and store movie data from TMDB API
  - Movie details including cast, crew, media, and trailers
  - Genre-based movie filtering
  - Movie search functionality

- **User Management**
  - User registration and authentication using JWT
  - Password hashing with bcrypt
  - User profile management

- **User Lists**
  - Watched movies list
  - Watchlist
  - Favorites list
  - List management operations (add/remove)

- **Reviews System**
  - Create, read, update, and delete movie reviews
  - Rating system
  - Anonymous review option

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Axios** - HTTP client for TMDB API requests
- **dotenv** - Environment variable management

## Project Structure

```
backend/
├── controllers/     # Request handlers
├── models/         # Database schemas
├── routes/         # API route definitions
└── server.js       # Application entry point
```

## API Endpoints

### Movies
- `GET /api/v1/movies` - Get all movies
- `GET /api/v1/movies/:movieId` - Get specific movie details
- `GET /api/v1/movies/genre/:genre` - Get movies by genre

### Reviews
- `GET /api/v1/movies/reviews/getReviews/:movieId` - Get movie reviews
- `POST /api/v1/movies/reviews/addReview/:movieId` - Add new review
- `PUT /api/v1/movies/reviews/updateReview/:movieId` - Update review
- `DELETE /api/v1/movies/reviews/deleteReview/:movieId` - Delete review

### Authentication
- `POST /api/v1/authorization/register` - Register new user
- `POST /api/v1/authorization/login` - User login

### User Lists
- `POST /api/v1/list/addToWatched/:movieId` - Add to watched list
- `POST /api/v1/list/addToWatchlist/:movieId` - Add to watchlist
- `POST /api/v1/list/addToFavourites/:movieId` - Add to favorites
- `DELETE /api/v1/list/removeFromWatched/:movieId` - Remove from watched
- `DELETE /api/v1/list/removeFromWatchlist/:movieId` - Remove from watchlist
- `DELETE /api/v1/list/removeFromFavourites/:movieId` - Remove from favorites

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- TMDB API Key

## Environment Variables

Create a `.env` file in the root directory:

```
MONGO_USER=your_mongodb_user
MONGO_PASSWORD=your_mongodb_password
MONGO_CLUSTER=your_mongodb_cluster
MONGO_DATABASE=your_database_name
API_KEY=your_tmdb_api_key
PORT=5000
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables as described above

3. Start the server:
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your environment variables)

## Development

The server uses `nodemon` for development, which automatically restarts the server when files change.

## Error Handling

The API implements standard HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error

## Security

- Passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Environment variables for sensitive data
- CORS enabled for frontend communication

## Testing

To run tests (when implemented):
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC License 