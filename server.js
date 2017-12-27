var express = require('express'),
app = express(),
/****** for mongoose architecture *****/
port = process.env.PORT || 8080,
mongoose = require('mongoose'),
Task = require('./api/models/teamModel'), //created model loading here
bodyParser = require('body-parser');

/****** JSWEBTOKEN module ******/
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');


/******* for passport auth *******/
app.use(session({
  store: new RedisStore({
    url: config.redisStore.url
  }),
  secret: config.redisStore.secret,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

/******* called libraries ******/
const passport = require('passport')//for login
const session = require('express-session') //for sessions when changing pages
const RedisStore = require('connect-redis')(session) //for sessions when changing pages

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var routes = require('./api/routes/teamRoute'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);
