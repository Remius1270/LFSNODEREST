'use strict';
module.exports = function(app) {
  var team = require('../controllers/userController');

  // todoList Routes
  app.route('/login')
    .get(team.list_all_teams)
    .post(team.create_a_team);


  app.route('/teams/:teamId')
    .get(team.read_a_team)
    .put(team.update_a_team)
    .delete(team.delete_a_team);
};
