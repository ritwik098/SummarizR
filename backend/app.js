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

app.use(passport.initialize());

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
app.use(forceSsl);
app.use(fileUpload({ safeFileNames: true, preserveExtension: true }));

app.use('/', index);
app.use('/auth', auth);
app.use('/login', passport.authenticate(['jwt'], { session: false }), index);
app.use('/users', users);
app.use('/summarizer', passport.authenticate(['jwt'], { session: false }), summarizer);

app.post('/upload', function(req, res, next) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let video = req.files.video;
 	console.log(video);
  // Use the mv() method to place the file somewhere on your server
  video.mv(path.join(__dirname, 'uploads', video.name + '-' + Date.now()), function(err) {
    if (err){
      console.log(err);
      return res.status(500).send(err);
    }
 
    res.send('File uploaded!');
  });
});

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

// console.log(token.generateAccessToken({"id": "askdjfhka"}));

console.log("Success");
module.exports = app;