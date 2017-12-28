'use strict';
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('config');

var mongoose = require('mongoose'),
  user = mongoose.model('User');

// CREATES A NEW USER
exports.create_a_user = function(req, res) {
  var new_user = new user(req.body);
  new_user.password = bcrypt.hashSync(new_user.password, 8);
  new_user.save(function(err, user) {
    if (err)
      res.send(err);
    res.send(user);
    // create a token
    var token = jwt.sign({ _userId: user._userId }, config.secret, {
     expiresIn: 86400 // expires in 24 hours
    });
   res.send({ auth: true, token: token });
  });
};

// RETURNS ALL THE USERS IN THE DATABASE
exports.list_all_users = function(req, res) {
  user.find({}, function(err,user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

// GETS A SINGLE USER FROM THE DATABASE
exports.read_a_user = function(req, res) {
  user.findById(req.params.userId, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

// DELETES A USER FROM THE DATABASE
exports.delete_a_user = function(req, res) {
  user.remove({
    _userId: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'user successfully deleted' });
  });
};

// UPDATES A SINGLE USER IN THE DATABASE
exports.update_a_user = function(req, res) {
  user.findOneAndUpdate({_userId: req.params.userId}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};
