/**
 * Scrim.js
 *
 * @description :: A record for a scrim wether it happened or not
 * @docs        :: https://github.com/balderdashy/sails-docs/blob/1.0/concepts/ORM/Models.md
 */

module.exports = {

  attributes: {
    team1: {
      model: "team",
      required: true
    },
    team2: {
      model: "team",
      required: true
    },
    state: {
      type: "string",
      isIn: ["potential", "confirmed", "inprogress", "ended" ],
      defaultsTo: "potential"
    },
    time: {
      type: "number",
      defaultsTo: 0,
    },
    winner: {
      model: "team"
    },
    loser: {
      model: "team"
    }
  }
};
