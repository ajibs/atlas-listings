const express = require('express');
const helmet = require('helmet');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const path = require('path');
const errorHandlers = require('./handlers/errorHandlers');

const app = express();


// secure app by setting http headers
app.use(helmet());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// serves up static files from the public folder.
app.use(express.static(path.join(__dirname, 'public')));


// retrieve information from POST requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// exposes a bunch of methods for validating data. used heavily in userController
app.use(expressValidator());


// load routes
app.use('/', routes);


// if routes don't work, 404 them and forward to error handler
app.use(errorHandlers.notFound);

// Otherwise it was a really bad error we didn't expect
if (app.get('env') === 'development') {
  // development error handler: prints stack trace
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);


module.exports = app;
