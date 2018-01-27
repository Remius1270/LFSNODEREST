/**
 * is-logged-in
 *
 * A simple policy that allows any request from an authenticated user.
 *
 * For more about how to use policies, see:
 *   https://sailsjs.com/config/policies
 *   https://sailsjs.com/docs/concepts/policies
 *   https://sailsjs.com/docs/concepts/policies/access-control-and-permissions
 */
module.exports = async function (req, res, proceed) {

  if (!req.headers['key']) {
    return res.badRequest({ message: 'Key not provided' });
  } else {
    req.key = await Key.findOne({ key: req.headers['key'] });
    if (!req.key) {
      return res.badRequest({ message: 'Invalid key' });
    } else if (sails.config.environment !== req.key.environment) {
      return res.badRequest({
        message: 'Key provided is for environment "' + req.key.environment + '" but server is in "' + sails.config.environment + '"'
      });
    } else if (sails.config.custom.version !== req.key.version) {
      return res.badRequest({
        message: 'Key provided is for version "' + req.key.version + '" but server is in "' + sails.config.custom.version + '"'
      });
    }
  }
  return proceed();

};
