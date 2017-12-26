'use strict';


var mongoose = require('mongoose'),
  team = mongoose.model('Team');

exports.list_all_teams = function(req, res) {
  team.find({}, function(err, team) {
    if (err)
      res.send(err);
    res.json(team);
  });
};


exports.create_a_team = function(req, res) {
  var new_team = new team(req.body);
  new_team.save(function(err, team) {
    if (err)
      res.send(err);
    res.json(team);
  });
};


exports.read_a_team = function(req, res) {
  team.findById(req.params.teamId, function(err, team) {
    if (err)
      res.send(err);
    res.json(team);
  });
};


exports.update_a_team = function(req, res) {
  team.findOneAndUpdate({_id: req.params.teamId}, req.body, {new: true}, function(err, team) {
    if (err)
      res.send(err);
    res.json(team);
  });
};


exports.delete_a_team = function(req, res) {
  team.remove({
    _id: req.params.teamId
  }, function(err, team) {
    if (err)
      res.send(err);
    res.json({ message: 'team successfully deleted' });
  });
};
