/**
 * Team.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true
    },
    elo: {
      type: "integer",
      required: true
    },
    dispo: {
      type: "string",
      required: true
    },
    logo_url:{
      type: "string",
      defaultsTo: ""
    },
    lfs: {
      type: "boolean",
      defaultsTo: false
    },
    players: {
      collection: "player",
      via: "teams"
    },
    manager: {
      model: "manager",
      required: true
    }
  }
};
