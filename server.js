// 1) IMPORT ALL OUR PACKAGES
const dotenv = require('dotenv').config({ path: './config/.env' }); //loads all the environment variables from the .env
const express = require('express');
const app = express(); // create app variable to configure our server
const mongoose = require('mongoose'); //to connect to our mongodb database

// 3) CONNECT TO OUR DATABASE
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); //actually connects to our database
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json()); // middleware - allow accept JSON as body instead of GET/POST element

// 4) SET UP OUR ROUTES
// a) Import route files:
const subscribersRouter = require('./routes/subscribers');
// b) Tell app wanna use this route when this url is used:
// anything with this url or additions to it will go to the 'subscribersRouter' above.
app.use('/subscribers', subscribersRouter);

// 2) SETUP SERVER
// set up the listener on the server port
app.listen(3000, () => console.log('Server Started '));
