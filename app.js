const express = require('express');
const helmet = require('helmet');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const app = express();


// secure app by setting http headers
app.use(helmet());

// retrieve information from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// exposes a bunch of methods for validating data. used heavily in userController
app.use(expressValidator());


// load routes
app.use('/', routes);


module.exports = app;
