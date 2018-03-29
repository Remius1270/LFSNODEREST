module.exports = {


  friendlyName: 'Register',


  description: 'Tries to create a new Manager with the supplied ' +
    'credentials and returns it back',


  inputs: {
    name : {
      description: 'The display name',
      type: 'string',
      required: true
    },
    email : {
      description: 'The email',
      type: 'string',
      required: true
    },
    password: {
      description: 'The password, unhashed',
      type: 'string',
      required: true
    },
    role: {
      description: 'The id of the role to attach',
      type: 'number',
      defaultsTo: -1
    }
  },


  exits: {
    success: {
      description: 'Created a manager',
      responseType: 'ok'
    },
    alreadyExists: {
      description: 'The email already exists',
      responseType: 'badRequest'
    },
    badPassword: {
      description: 'The password doesn\'t follow the rules',
      responseType: 'badRequest'
    },
    // badRole: {
    //   description: 'The supplied role doesn\'t exist',
    //   responseType: 'badRequest'
    // }
  },


  fn: async function (inputs, exits) {
    if (inputs.role === -1) {
      let role = await Role.findOne({ name:"Manager" });
      inputs.role = role.id;
    }
    inputs.password = await sails.helpers.passwords.hashPassword(inputs.password);
    try {
      let manager = await Manager.create(inputs).fetch();
      return exits.success(manager);
    } catch (e) {
      switch (e.name) {
        case 'UsageError':
          return exits.alreadyExists(e);
          break;
        default:
          return this.res.serverError(e);
          break;
      }
    }
  }


};
