/**
 * custom hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineCustomHook(sails) {

  return {

    /**
     * Runs when a Sails app loads/lifts.
     *
     * @param {Function} done
     */
    initialize: function (done) {

      sails.log.info('Initializing custom hook (`custom`)');

      sails.on("ready", ()=>{
        sails.log(sails);
      });

      // const passport = require('passport');
      // const LocalStrategy = require('passport-local').Strategy;
      //
      // passport.use(new LocalStrategy({
      //     usernameField: 'email'
      //   },
      //   function(email, password, done) {
      //     Manager.findOne({ email }, function(err, user) {
      //       if (err) { return done(err); }
      //       if (!user) {
      //         return done(null, false, { message: 'Incorrect email.' });
      //       }
      //       sails.helpers.passwords.checkPassword(password, user.password)
      //         .catch(()=>{
      //           return done(null, false, { message: 'Incorrect password.' });
      //         })
      //         .then(()=>{
      //           return done(null, user);
      //         });
      //       // if (user.password != password) {
      //       //   return done(null, false, { message: 'Incorrect password.' });
      //       // }
      //       // return done(null, user);
      //     });
      //   }
      // ));
      //
      // passport.serializeUser(function(user, done) {
      //   done(null, user.id);
      // });
      //
      // passport.deserializeUser(function(id, done) {
      //   Manager.findOne(id).exec(function(err, user) {
      //     done(err, user);
      //   });
      // });

      // Be sure and call `done()` when finished!
      // (Pass in Error as the first argument if something goes wrong to cause Sails
      //  to stop loading other hooks and give up.)
      return done();

    },

    routes: {
      before: {
        '/*': function (req, res, next) {
          var match = req.path.match(/\/v(\d)\//);
          if (match) req.version = parseInt(match[1]);
          else req.version = sails.config.custom.version;
          return next();
        }
      }
    }

  };

};
