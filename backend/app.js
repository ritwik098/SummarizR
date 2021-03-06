var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var summarizer = require('./routes/summarizer');

const config = require('./config/config');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const token = require('./utils/token');
const fileUpload = require('express-fileupload');

require('./config/passport');

var app = express();
var forceSsl = require('express-force-ssl');
var redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
app.use(passport.initialize());
app.use(redirectToHTTPS([], [], 301));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(forceSsl);
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

app.use('/', index);
app.use('/auth', auth);
app.use('/login', passport.authenticate(['jwt'], { session: false }), index);
app.use('/user', passport.authenticate(['jwt'], { session: false }), users);
app.use('/summarizer', passport.authenticate(['jwt'], { session: false }), summarizer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("Success");
module.exports = app;
