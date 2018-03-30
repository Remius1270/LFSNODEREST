/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  'GET /v1/login': { action: "login" },
  'POST /v1/register': { action: "register" },
  'GET /v1/getcompetitors': { action: "getcompetitors" },
  'GET /v1/teamsintier': { action: "teamsintier" },
  'GET /v1/verifyemail': { action: "verifyemail" },

  'GET /login': { action: "login" },
  'POST /register': { action: "register" },
  'GET /getcompetitors': { action: "getcompetitors" },
  'GET /teamsintier': { action: "teamsintier" },
  'GET /verifyemail': { action: "verifyemail" },

  'POST /manager': { response: "forbidden" },

};
