# MovieAPI Frontend

A modern, responsive React application for browsing and managing movies. This frontend provides an intuitive user interface for movie discovery, user authentication, and personal movie list management.

## Features

### Movie Discovery
- **Home Page Carousel**: Dynamic showcase of random movies with trailer links
- **Movie Grid**: Paginated display of all movies
- **Genre Filtering**: Browse movies by specific genres
- **Movie Details**: Comprehensive movie information including:
  - Title, release date, runtime, and status
  - Overview and genres
  - Cast and crew information
  - Media gallery (posters, backdrops, logos)
  - Trailer viewing
  - User ratings and reviews

### User Features
- **Authentication**
  - User registration with validation
  - Secure login system
  - JWT-based session management
- **Personal Lists**
  - Mark movies as watched
  - Add to watchlist
  - Save to favorites
- **Review System**
  - Write, edit, and delete reviews
  - Rate movies
  - Option for anonymous reviews
  - View all reviews for a movie

### UI/UX Features
- Responsive design for all screen sizes
- Modern, intuitive navigation
- Dynamic loading states
- Error handling with user feedback
- Smooth transitions and animations
- Dark theme optimized for movie browsing

## Tech Stack

- **React.js** - Frontend framework
- **React Router** - Navigation and routing
- **Material-UI** - UI components and styling
- **Bootstrap** - Additional styling and components
- **Axios** - HTTP client for API requests
- **JWT-decode** - Token handling
- **React Player** - Video playback
- **Font Awesome** - Icons
- **CSS Modules** - Scoped styling

## Project Structure

```
frontend/
├── public/           # Static files
├── src/
│   ├── api/         # API configuration and services
│   ├── components/  # React components
│   │   ├── MoviePage/   # Movie detail components
│   │   └── ...         # Other components
│   ├── styles/     # CSS modules
│   ├── App.jsx     # Main application component
│   └── index.jsx   # Application entry point
└── package.json    # Dependencies and scripts
```

## Component Overview

### Core Components
- `Home` - Landing page with movie carousel
- `Movies` - Movie grid with pagination
- `Movie` - Detailed movie view
- `Login` - User authentication
- `Header` - Navigation and user menu

### Movie Page Components
- `MovieInfo` - Main movie details
- `CastCrew` - Cast and crew information
- `MovieMedia` - Media gallery
- `Reviews` - Review management

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment:
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api/v1
```

3. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm start` - Run development server
- `npm build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Development

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running (see backend README)

### Code Style
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Maintain consistent naming conventions
- Write descriptive comments

### State Management
- Local state with useState
- Component state with useEffect
- JWT stored in localStorage
- Axios interceptors for authentication

## Styling

The project uses a combination of:
- CSS Modules for component-specific styles
- Material-UI components
- Bootstrap for layout and utilities
- Custom theme variables for consistency

## Error Handling

- Form validation feedback
- API error messages
- Loading states
- Fallback UI components
- Network error handling

## Testing

To run the test suite:
```bash
npm test
```

## Building for Production

Create an optimized production build:
```bash
npm run build
```

This will create a `build` folder with the production-ready application.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC License
