module.exports = {


  friendlyName: 'Verify Email',


  description: 'Verifies an email with a token',


  inputs: {
    token: {
      description: 'The token to verify',
      type: 'string',
      required: true
    },
    id: {
      description: 'The id of the manager to verify',
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      description: 'Verified email',
      responseType: 'ok'
    },
    wrongToken: {
      description: 'The token isn\'t valid for this manager',
      responseType: 'badRequest'
    },
    alreadyVerified: {
      description: 'The email is already verified',
      responseType: 'badRequest'
    },
  },


  fn: async function (inputs, exits) {
    let manager = await Manager.findOne(inputs.id);
    if (manager.emailVerified) {
      return exits.alreadyVerified({
        message: "Email already verified"
      });
    } else if (manager.emailVerificationToken === inputs.token) {
      try {
        await Manager.update({ id:manager.id }, { emailVerificationToken:'', emailVerified:true });
      } catch (e) {
        return this.res.serverError(e);
      }
      return exits.success();
    } else {
      return exits.wrongToken({
        message: "Wrong token"
      });
    }
  }


};
