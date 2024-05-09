//importing
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import cors from 'cors';
import path from "path";
import { fileURLToPath } from 'url';

// Getting access to .env file
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import movieRoutes from './routes/movies.js';
import reviewRoutes from './routes/reviews.js';
import authorizationRoutes from './routes/authorization.js';
import userListRoutes from './routes/lists.js';
import userRoutes from './routes/user.js';



//creating instance of Express application
const app = express();
app.use(cors());
app.use(bodyParser.json()); //or can apparently use express.json() ~ bodyparser.json vs express.json

//Setting up routes for different parts of applictaion
// app.use('/movies', movieRoutes)
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/movies/reviews', reviewRoutes);
app.use('/api/v1/authorization', authorizationRoutes);
app.use('/api/v1/list', userListRoutes);
app.use('/api/v1/user', userRoutes);


// app.use(express.static(path.join(__dirname, 'frontend/build')));
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
// });

// Deployment Code
// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
// });



//Port is initialized with the value of the environment if set, or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



// ESTABLISHING CONNECTION TO DATABASE

// Retrieving sensitive information from .env file
const user = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD
const cluster = process.env.MONGO_CLUSTER
const database = process.env.MONGO_DATABASE

// Building mongoDb URI
const mongodbURI = `mongodb+srv://${user}:${password}@${cluster}/${database}`
// console.log(user)
// console.log(password)
// console.log(cluster)
// console.log(database)
// Connect to MongoDB
mongoose.connect(mongodbURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

