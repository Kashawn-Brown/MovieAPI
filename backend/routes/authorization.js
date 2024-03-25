//User Authentication

//Import the Express.js library, which is used to create web applications and APIs in Node.js
const express = require('express');

//Creating an instance of an Express router, 
//Used to define route handlers for different HTTP methods and paths
const router = express.Router();

//importing bcrypt - used for handling password hashing
const bcrypt = require('bcryptjs');

//importing JSON Web Tokens (jwts) - for authentication and authorization
const jwt = require('jsonwebtoken');

//Importing the mongoose schema for Users
const User = require('../models/userSchema');


/* User Authentication routes */
//data sent in the request body (req.body)

//Register new user 
//Asynchrounous because of the asynchronous nature of operations such as database queries
router.post('/register', async (req, res) => {

  try{

    // Take the username, email and password the user gives to create their account
    const { userName, email, password } = req.body;

    //Error message is returned if any of the values were left blank
    if (!userName || !email || !password) 
    {
      return res.status(400).json({ message: 'Please provide username, email, and password' });
    }


    //Check if email is already registered
    const existingUser = await User.findOne({ email });
    if(existingUser)
    {
      return res.status(400).json({ message: 'User already exists' });
    }


    //Check if password meets criteria
    if (password.length < 8) 
    {
      return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) 
    {
      return res.status(400).json({ message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character' });
    }


    //Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);


    //Create the new user with the information
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();


    //Generate JWT token
    const token = jwt.sign({ userId: newUser._id, admin: false }, 'secretKey', { expiresIn: '2h' });

    res.status(201).json({ message: 'User created', token });

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
    
  });


//User login
router.post('/login', async (req, res) => {
  try{

    // Take the email and password the user gives to create their account
    const { email, password } = req.body;

    //Check if email is already registered
    const existingUser = await User.findOne({ email });
    if(!existingUser)
    {
      return res.status(400).json({ message: 'There is no user registered under this email' });
    }


    //Check if the password is correct
    const correctPassword = await bcrypt.compare(password, existingUser.password);
    if (!correctPassword) {
      return res.status(400).json({ message: 'Incorrect password' });
    }


    //Generate JWT token
    const token = jwt.sign({ userId: existingUser._id }, 'secretKey', { expiresIn: '2h' });

    res.status(201).json({ message: 'Login Successful', token });


  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  
});




// const auth = require('../routes/authMiddleware');

// // Protected route that requires authentication
// router.get('/protected', auth, (req, res) => {
//   res.json({ message: 'You are authenticated.', user: req.user });
// });




//Exporting the router object, making it available for use in other parts of the application
//Can import this router into main application file (e.g., server.js) 
//and mount it at a specific path to handle user authentication requests.
module.exports = router;