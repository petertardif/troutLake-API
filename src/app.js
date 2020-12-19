require('dotenv').config();
const express = require('express');
const helmet = require("helmet");
const { NODE_ENV } = require('./config');

const app = express();

// disabling contentSecurityPolicy so graphiQL will work
// TODO: turn back on in production.
app.use(helmet({contentSecurityPolicy: false,}));

app.get('/', (req,res) => {
  res.send('Hello, Ms. World!')
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = {error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response);
});

module.exports = app;