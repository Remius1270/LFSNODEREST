'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  // user Routes
  app.route('/login')
    .post(user.create_a_team);


  app.route('/teams/:teamId')
    .get(team.read_a_team)
    .put(team.update_a_team)
    .delete(team.delete_a_team);
};
