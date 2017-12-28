'use strict';
module.exports = function(app) {
  var team = require('../controllers/teamController');

  //team Routes
  app.route('/teams')
  .get(team.list_all_teams)
  .post(team.create_a_team);


  app.route('/teams/:teamId')
  .get(team.read_a_team)
  .put(team.update_a_team)
  .delete(team.delete_a_team);

  var user = require('../controllers/userController');

  // user Routes
  app.route('/register')
  .post(user.create_a_user);//done not tested

  // app.route('/login')
  // .post(user.login);//not done yet

  app.route('/users')
  .get(user.list_all_users);

  app.route('/user/:userId')
  .get(user.read_a_user)//done not tested
  .put(user.update_a_user)//done not tested
  .delete(user.delete_a_user);//done not tested
};
