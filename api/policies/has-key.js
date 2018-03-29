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
    return res.badRequest({ message: 'key not provided' });
  } else {
    req.key = await Key.findOne({ key: req.headers['key'] });
    if (!req.key) {
      return res.badRequest({ message: 'Invalid key' });
    } else if (sails.config.environment !== req.key.environment) {
      return res.badRequest({
        message: 'key provided is for environment "' + req.key.environment + '" but server is in "' + sails.config.environment + '"'
      });
    } else if (!_.intersection(req.key.versions, [req.version]).length) {
      return res.badRequest({
        message: 'key provided is for versions "' + req.key.versions + '" but requested endpoint is in "' + req.version + '"'
      });
    }
  }
  // log key use but never save password
  var params = req.allParams();
  delete params.password;
  var args = JSON.stringify(params);
  KeyUsed.create({
    key: req.key.id,
    uri: req.path,
    method: req.method.toUpperCase(),
    args
  })
  .catch(sails.log.warn);
  return proceed();

};
