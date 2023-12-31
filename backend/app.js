const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const passport = require('passport'); 
const debug = require('debug');

const { isProduction } = require('./config/keys');

require('./models/User');
require('./models/Itinerary');
require('./models/Like');
require('./models/View');
require('./models/Day');
require('./models/Activity');

require('./config/passport'); 

const usersRouter = require('./routes/api/users');
const csrfRouter = require('./routes/api/csrf');

const itinerariesRouter = require('./routes/api/itineraries')
const locationsRouter = require('./routes/api/locations')
const placesRouter = require('./routes/api/places'); 

const app = express();

app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());
app.use(passport.initialize());

app.use(
    csurf({
        cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
        }
    })
);

if (!isProduction) {
    app.use(cors());
}

app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);
app.use('/api/itineraries', itinerariesRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/places', placesRouter); 

// Serve static React build files statically in production
if (isProduction) {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    app.get('/', (req, res) => {
      res.cookie('CSRF-TOKEN', req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, '../frontend', 'build', 'index.html')
      );
    });
  
    // Serve the static assets in the frontend's build folder
    app.use(express.static(path.resolve("../frontend/build")));
  
    // Serve the frontend's index.html file at all other routes NOT starting with /api
    app.get(/^(?!\/?api).*/, (req, res) => {
      res.cookie('CSRF-TOKEN', req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, '../frontend', 'build', 'index.html')
      );
    });
}

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});
  
const serverErrorLogger = debug('backend:error');
  
app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
});

module.exports = app;
