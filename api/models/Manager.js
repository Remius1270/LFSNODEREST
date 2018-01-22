/**
 * Manager.js
 *
 * @description :: The manager model, storing login info and managed teams
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
      unique: true,
      isEmail: true,
    },
    password: {
      type: "string",
      required: true,
      protect: true,

    },
    teams: {
      collection: "team",
      via: "manager"
    }
  }
};
