//Import the Express.js library, which is used to create web applications and APIs in Node.js
import express from 'express';
//Creating an instance of an Express router, 
//Used to define route handlers for different HTTP methods and paths
const router = express.Router();
//importing bcrypt - used for handling password hashing
import bcrypt from 'bcryptjs';
//importing JSON Web Tokens (jwts) - for authentication and authorization
import jwt from 'jsonwebtoken';
//Importing the mongoose schema for Users
import User from '../models/userSchema.js';

export const register = async (req, res) => {

  try{

    // Take the username, email and password the user gives to create their account
    const { userName, email, password } = req.body;

    //Check if email is already registered
    const existingUser = await User.findOne({ email });
    if(existingUser) return res.status(400).json({ message: 'User already exists' });
    

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
    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, 'secretKey', { expiresIn: '2h' });

    res.status(201).json({ message: 'User created', token, newUser });

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
    
  }

export const login = async (req, res) => {
  
  try{

    // Take the email and password the user gives to create their account
    const { email, password } = req.body;

    //Check if email is already registered
    const existingUser = await User.findOne({ email });

    if(!existingUser) return res.status(400).json({ message: 'There is no user registered under this email' });
    

    //Check if the password is correct
    const correctPassword = await bcrypt.compare(password, existingUser.password);
    if (!correctPassword) return res.status(400).json({ message: 'Incorrect password' });

    
    //Generate JWT token
    const token = jwt.sign({ userId: existingUser._id, email: existingUser.email }, 'secretKey', { expiresIn: '2h' });

    res.status(200).json({ message: 'Login Successful', token, existingUser });


  }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  
}