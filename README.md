# MovieAPI

A full-stack web application for browsing and managing movie information, with features for user authentication, movie details, reviews, and personal movie lists.

## Features

- **Movie Browsing**: Browse through a collection of movies with detailed information
- **Movie Details**: View comprehensive movie information including:
  - Title, release date, and runtime
  - Overview and genres
  - Cast and crew information
  - Movie media (posters, backdrops, logos)
  - Trailers and videos
- **User Features**:
  - User authentication (register/login)
  - Personal movie lists (Watched, Watchlist, Favorites)
  - Write and manage movie reviews
  - Rate movies
- **Search & Filter**:
  - Browse movies by genre
  - Pagination support
- **Responsive Design**: Modern and responsive UI built with React and Bootstrap

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Bootstrap & Material-UI for styling
- Axios for API requests
- Various React components (react-material-ui-carousel, react-player, etc.)

### Backend
- Node.js with Express.js
- MongoDB with Mongoose for data storage
- JWT for authentication
- RESTful API architecture

## Project Structure

```
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── styles/        # CSS modules
│   │   ├── api/           # API configuration
│   │   └── App.jsx        # Main application component
│   └── public/            # Static files
│
├── backend/                # Express backend application
│   ├── controllers/       # Route controllers
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   └── server.js         # Server entry point
```

## Prerequisites

- Node.js
- MongoDB
- API Key from TMDB (The Movie Database)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
MONGO_USER=your_mongodb_user
MONGO_PASSWORD=your_mongodb_password
MONGO_CLUSTER=your_mongodb_cluster
MONGO_DATABASE=your_database_name
API_KEY=your_tmdb_api_key
PORT=5000
```

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

- `/api/v1/movies` - Get all movies
- `/api/v1/movies/:movieId` - Get specific movie details
- `/api/v1/movies/genre/:genre` - Get movies by genre
- `/api/v1/movies/reviews/*` - Review-related endpoints
- `/api/v1/authorization/*` - Authentication endpoints
- `/api/v1/list/*` - User list management endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC License - see the LICENSE file for details
 
