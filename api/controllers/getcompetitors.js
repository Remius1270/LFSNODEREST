module.exports = {


  friendlyName: 'Get Competitors',


  description: 'Get a list of teams in a range of elo',


  inputs: {
    id: {
      description: 'The id of the team to search for',
      type: 'number',
      required: true,
    },
    range: {
      description: 'How much elo difference to allow',
      type: 'number',
      defaultsTo: 200,
      min: 0,
    },
    limit: {
      description: 'How many records to return',
      type: 'number',
      defaultsTo: 5000,
      min: 0,
    }
  },


  exits: {
    success: {
      description: 'Found teams',
      responseType: 'ok',
    },
    notFound: {
      description: 'The specified team wasnt found',
      responseType: 'notFound',
    }
  },


  fn: async function (inputs, exits) {
    const team = await Team.findOne(inputs.id);
    if (!team) return exits.notFound({
      message: 'The specified team wasnt found'
    });
    const nearteams = await Team.find({
      where: {
        and: [
          { elo : { '<=': team.elo + inputs.range } },
          { elo : { '>=': team.elo - inputs.range } },
          { id : { '!=': team.id } },
        ]
      },
      limit: inputs.limit
    });
    return exits.success(nearteams);
  }


};
