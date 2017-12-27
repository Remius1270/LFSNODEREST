'use strict';
module.exports = function(app) {
  var user = require('../controllers/userController');

  // user Routes
  app.route('/register')
    .post(user.create_a_user);//done not tested

  app.route('/login')
    .post(user.login);//not done yet


  app.route('/user/:userId')
    .get(user.read_a_user)//done not tested
    .put(user.update_a_user)//done not tested
    .delete(user.delete_a_user);//done not tested
};
