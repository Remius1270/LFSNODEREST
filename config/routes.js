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
  'GET /v1/getcompetitors': { action: "getcompetitors" },

  'GET /login': { action: "login" },
  'GET /getcompetitors': { action: "getcompetitors" },

};
