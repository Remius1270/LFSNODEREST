var express = require('express'),
app = express(),
/****** for mongoose architecture *****/
port = process.env.PORT || 8080,
mongoose = require('mongoose'),
team = require('./api/models/teamModel'), //created model loading here
user = require('./api/models/userModel'),
bodyParser = require('body-parser');

/****** JSWEBTOKEN module ******/
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('config');

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
