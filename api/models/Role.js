/**
 * Role.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true,
      maxLength: 100,
    },
    createTeam: {
      type: "boolean",
      defaultsTo: true
    },
    updateTeam: {
      type: "boolean",
      defaultsTo: true
    },
    deleteTeam: {
      type: "boolean",
      defaultsTo: true
    },
    createPlayer: {
      type: "boolean",
      defaultsTo: true
    },
    updatePlayer: {
      type: "boolean",
      defaultsTo: true
    },
    deletePlayer: {
      type: "boolean",
      defaultsTo: false
    },
    createScrim: {
      type: "boolean",
      defaultsTo: true
    },
    updateScrim: {
      type: "boolean",
      defaultsTo: true
    },
    deleteScrim: {
      type: "boolean",
      defaultsTo: false
    },
    updateSelf: {
      type: "boolean",
      defaultsTo: true
    },
    deleteSelf: {
      type: "boolean",
      defaultsTo: false
    },
    updateOthers: {
      type: "boolean",
      defaultsTo: false
    },
    deleteOthers: {
      type: "boolean",
      defaultsTo: false
    },
    isAdmin: {
      type: "boolean",
      defaultsTo: false
    },
    isModerator: {
      type: "boolean",
      defaultsTo: false
    }
  }
};
