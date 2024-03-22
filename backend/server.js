//importing
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require('cors');

// Getting access to .env file
require('dotenv').config({ path: '../.env' });


//creating instance of Express application
const app = express();

app.use(cors());
app.use(bodyParser.json()); //or can apparently use express.json() ~ bodyparser.json vs express.json


//Setting up routes for different parts of applictaion
app.use('/api/v1/movies', require('./routes/movies'));
app.use('/api/v1/movies/reviews', require('./routes/reviews'));


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

// Connect to MongoDB
mongoose.connect(mongodbURI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});