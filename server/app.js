const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

//Middleware
app.use(cors({
  origin:'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());

// Import Routes
const authRoute = require('./routes/auth');
const deckRoute = require('./routes/decks');
const cardRoute = require('./routes/cards');

//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/decks', deckRoute);
app.use('/cards', cardRoute);

mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true },
() => {console.log('connected to db!')});

app.listen(8000);
