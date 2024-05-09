//Import the Express.js library, which is used to create web applications and APIs in Node.js
import express from 'express';
//Creating an instance of an Express router, 
//Used to define route handlers for different HTTP methods and paths
const router = express.Router();


import { register, login, } from '../controllers/authorization.js'


/* User Authentication routes */
//data sent in the request body (req.body)

//Register new user 
//Asynchrounous because of the asynchronous nature of operations such as database queries
router.post('/register', register);


//User login
router.post('/login', login);



//Exporting the router object, making it available for use in other parts of the application
//Can import this router into main application file (e.g., server.js) 
//and mount it at a specific path to handle user authentication requests.
export default router;