var Sails = require('sails');
var app;

// Before running any tests...
before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(15000);

  Sails.lift({
    hooks: {
      grunt: false,
      apianalytics: false,
    },
    log: { level: 'debug' },
    models: {
      datastore: 'local',
      migrate: 'drop'
    },

  }, function(err, sails) {
    app = sails;
    return done(err, sails);
  });
});

// After all tests have finished...
after(function(done) {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);

});
