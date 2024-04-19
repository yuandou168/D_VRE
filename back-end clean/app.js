const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const mongoose = require('mongoose');
const config = require('config');
var fileupload = require("express-fileupload");
const { expressjwt }  = require("express-jwt");

const configuration = require("./modules/users/config");


// var compression = require("compression");

const app = express();
app.use(cors());

const routeManager = require('./helpers/router');

// if (config.has('auth')) {
//   const passport = require('passport');
//   app.use(passport.initialize());
// }

mongoose.connect(config.get('app.db'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// function shouldCompress(req, res) {
//   let ext = req.path.substring(req.path.lastIndexOf(".") + 1);
//   ext = ext ? ext.toLowerCase() : null;
//   if (ext != "js" && ext != "css" && ext != "json") {
//     // don't compress responses with this request header
//     return false;
//   }
//   return compression.filter(req, res);
// }
// app.use(compression({ filter: shouldCompress }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());
// app.use(expressjwt(configuration));
// app.use(jwtMiddleware)

app.use('/', routeManager);

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  let allowedOrigins = [];
  if (config.has('cors')) allowedOrigins = config.get('cors') || [];
  const { origin } = req.headers;

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

/// catch 404 and forwarding to error handler
app.use((req, res, next) => {
  if (req.headers['content-type'] == 'application/json') {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    res.status(404).render('misc/404', {
      title: 'Not Found',
      status: 404,
      url: req.url,
    });
  }
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      success: false,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

module.exports = app;
