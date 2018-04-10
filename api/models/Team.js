/**
 * Team.js
 *
 * @description :: A team storing player info, manager and disponibility
 * @docs        :: https://github.com/balderdashy/sails-docs/blob/1.0/concepts/ORM/Models.md
 */

module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true,
      maxLength: 100,
    },
    elo: {
      type: "number",
      required: true,
      isInteger: true,
      min: 0,
      max: 5000,
    },
    dispo: {
      type: "json",
      defaultsTo: [],
    },
    logo_url:{
      type: "string",
      defaultsTo: "",
    },
    lfs: {
      type: "boolean",
      defaultsTo: false,
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
