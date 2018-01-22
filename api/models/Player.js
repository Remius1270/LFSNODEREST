/**
 * Player.js
 *
 * @description :: A player that can be in multiple teams and has a contact email
 * @docs        :: https://github.com/balderdashy/sails-docs/blob/1.0/concepts/ORM/Models.md
 */

module.exports = {

  attributes: {
    name: {
      type: "string",
      required: true,
      maxLength: 100,
    },
    email: {
      type: "string",
      required: true,
      isEmail: true,
    },
    teams: {
      collection: "team",
      via: "players"
    }
  }
};
