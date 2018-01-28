/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

  version: 1,

  tiers: {
    bronze: { low: 1, high: 1499 },
    silver: { low: 1500, high: 1999 },
    gold: { low: 2000, high: 2499 },
    platinum: { low: 2500, high: 2999 },
    diamond: { low: 3000, high: 3499 },
    master: { low: 3500, high: 3999 },
    grandmaster: { low: 4000, high: 5000 },
  },

};
