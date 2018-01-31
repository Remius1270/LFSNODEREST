module.exports = {


  friendlyName: 'Teams In Tier',


  description: 'Teams in the specified tier.',


  inputs: {
    tier: {
      description: 'The name of the elo tier',
      type: 'string',
      required: true,
    }
  },


  exits: {
    success: {
      description: 'The teams in the specified elo',
      responseType: 'ok',
    },
    invalidTier: {
      description: 'The specified tier does not exist',
      responseType: 'badRequest',
    }
  },


  fn: async function (inputs, exits) {
    const tier = sails.config.custom.tiers[inputs.tier];
    if (!tier)
      return exits.invalidTier({ message: "The specified tier does not exist"});
    const teams = await Team.find({
      where: {
        and: [
          { elo: { '<=':tier.high } },
          { elo: { '>=':tier.low } },
        ]
      },
      sort: 'elo DESC'
    });
    return exits.success(teams);

  }


};
