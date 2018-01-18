/**
 * Scrim.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
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
      type: "enum",
      enum: ["potential", "confirmed", "inprogress", "finished"],
      defaultsTo: "potential"
    },
    time: {
      type: "datetime",
      required: true,
      datetime: true
    }
  }
};
