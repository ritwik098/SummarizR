var passport = require('passport');
var jwt = require('jsonwebtoken');
var passportJWT = require('passport-jwt');
var _ = require("lodash");
var mongo = require('../utils/mongoDBCalls');

var mongoose = require('mongoose');
const userSchema = require('./../models/user');

const config = require('./config')

// Use connect method to connect to the server
mongo.connectToMongo(function(error, response) {
  if (!error) {
    console.log("connected: " + response);
  }
});

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.JWT_SECRET;
jwtOptions.issuer = config.JWT_ISSUER;
jwtOptions.audience = config.JWT_AUDIENCE;

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  // mongo.checkUserExists(jwt_payload, function(error, result) {
  //   next(error, result);
  // });
  next(null,{
  "iat": 1497340378, 
  "exp": 1497343978,
  "aud": "social-logins-spa",
  "iss": "social-logins-spa",
  "sub": "0"
});
});

passport.use(strategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/*  FACEBOOK AUTH  */
const FacebookStrategy = require('passport-facebook').Strategy;

const FACEBOOK_APP_ID = config.facebook.CLIENT_ID;
const FACEBOOK_APP_SECRET = config.facebook.CLIENT_SECRET;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/redirect",
    profileFields: ['id', 'email', 'name', 'picture']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("Adding a new user using Facebook");

    var user = {};
    user.id = profile.id;
    user.email = profile.emails[0].value;
    user.lastname = profile.name.familyName;
    user.firstname = profile.name.givenName;
    user.username = null,
    user.profilePicture = 'http://graph.facebook.com/' + profile.id + '/picture?type=large';
    user.tokens = 25;
    user.currentLeague_id = null;
    cb(null, user);
    // mongo.addUser(user, function(error, result) {
    //   return cb(error, JSON.parse(JSON.stringify(result)));
    // });
  }
));

/*  GOOGLE AUTH  */
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_APP_ID = config.google.CLIENT_ID;
const GOOGLE_APP_SECRET = config.google.CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_APP_ID,
    clientSecret: GOOGLE_APP_SECRET,
    callbackURL: "/auth/google/redirect"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("Adding a new user using Google");

    var user = new userSchema();
    user.id = profile.id;
    user.email = profile.emails[0].value;
    user.lastname = profile.name.familyName;
    user.firstname = profile.name.givenName;
    user.username = null,
    user.profilePicture = profile._json.image.url + '0';

    console.log(user);
    cb(null, user);

    // mongo.addUser(user, function(error, result) {
    //   return cb(error, JSON.parse(JSON.stringify(result)));
    // });
  }
));