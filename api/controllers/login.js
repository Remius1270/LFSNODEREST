module.exports = {


  friendlyName: 'Login',


  description: 'Tries to find a Manager with the supplied ' +
    'credentials and send it back, returns 404 if not found',


  inputs: {
    email : {
      description: 'The email',
      type: 'string',
      required: true
    },
    password: {
      description: 'The password, unhashed',
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {
      description: 'Found a user',
      responseType: 'ok'
    },
    notFound: {
      description: 'The credentials do not match any manager',
      responseType: 'notFound'
    },
    invalid: {
      description: 'The email and passwords do not match',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs, exits) {

    const user = await Manager.findOne({
      email: inputs.email
    });
    if (!user) return exits.notFound({
      message: 'The credentials do not match any manager'
    });
    sails.helpers.passwords.checkPassword(inputs.password, user.password)
      .then(()=>{
        delete user.password;
        return exits.success(user);
      })
      .catch(()=>{
        return exits.invalid({
          message: 'The email and passwords do not match'
        });
      });
  }


};
