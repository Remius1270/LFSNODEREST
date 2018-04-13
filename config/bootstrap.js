/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // Import dependencies
  var path = require('path');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 3;

  // This path indicates where to store/look for the JSON file that tracks the "last run bootstrap info"
  // locally on this development computer (if we happen to be on a development computer).
  var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');

  // Whether or not to continue doing the stuff in this file (i.e. wiping and regenerating data)
  // depends on some factors:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // If the hard-coded data version has been incremented, or we're being forced
  // (i.e. `--drop` or `--environment=test` was set), then run the meat of this
  // bootstrap script to wipe all existing data and rebuild hard-coded data.
  if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
    // If this is _actually_ a production environment (real or simulated), or we have
    // `migrate: safe` enabled, then prevent accidentally removing all data!
    if (process.env.NODE_ENV==='production' || sails.config.models.migrate === 'safe') {
      sails.log.warn('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "'+sails.config.environment+'" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
      return done();
    }//•

    // Compare bootstrap version from code base to the version that was last run
    var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
    .tolerate('doesNotExist');// (it's ok if the file doesn't exist yet-- just keep going.)

    if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
      sails.log('Skipping v'+HARD_CODED_DATA_VERSION+' bootstrap script...  (because it\'s already been run)');
      sails.log('(last run on this computer: @ '+(new Date(lastRunBootstrapInfo.lastRunAt))+')');
      return done();
    }//•

    sails.log('Running v'+HARD_CODED_DATA_VERSION+' bootstrap script...  ('+(lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v'+lastRunBootstrapInfo.lastRunVersion+' @ '+(new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer')+')');
  }
  else {
    sails.log('Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)');
  }

  // Since the hard-coded data version has been incremented, and we're running in
  // a "throwaway data" environment, delete all records from all models.
  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  }//∞

  // By convention, this is a good place to set up fake data during development.
  await Role.createEach([
    { id:1, name: 'Manager' },
    { id:2, name: 'Admin', deletePlayer:true, deleteScrim:true, deleteSelf:true, updateOthers:true, deleteOthers:true, isAdmin:true, isModerator:true },
  ]);
  await Manager.createEach([
    { id: 1, email: 'admin@example.com', name: 'Paul \'Paul\' Paulson', password: await sails.helpers.passwords.hashPassword('abc123'), role:2 },
    { id: 2, email: 'peon@example.com', name: 'Jean Rachid Chang', password: await sails.helpers.passwords.hashPassword('trololo'), role:1 },
    { id: 3, email: 'graaav@example.com', name: 'Grasse Vinasse', password: await sails.helpers.passwords.hashPassword('root'), role:1 },
  ]);
  await Key.createEach([
    { id: 1, key: "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg", environment: 'development', usedBy: 'larabite', versions: [1] },
    { id: 2, key: "tgssAbXYKz1f1Pref14rtgssAbXYKz1f1Pref14rsgt6", environment: 'development', usedBy: 'tests', versions: [2] },
    { id: 3, key: "ecSmVwId5g06fUOoTKIu3iXDzzly0JzIVePoVwMTloNs", environment: 'production', usedBy: 'tests', versions: [1] },
    { id: 4, key: "lMJC6k3v15v5sKlYCnQZKTm7Gx21x2eMZoPQetfU2sy8", environment: 'production', usedBy: 'tests', versions: [2] },
    { id: 5, key: "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs", environment: 'development', usedBy: 'tests', versions: [1] },
    { id: 6, key: "g851a4umml87bfgudlmv8mvpjmegav9evofi2gqj54ud", environment: 'development', usedBy: 'API dev', versions: [1] },
  ]);
  await Team.createEach([
    { id: 1, name: "Team1", elo: 3650, manager: 1 },
    { id: 2, name: "Team2", elo: 3500, manager: 2, dispo: ['PT18H/PT22H'] },
    { id: 3, name: "Team3", elo: 1220, manager: 3, dispo: ['PT19H/PT21H', 'P1DT19H/P1DT21H'] },
  ]);
  await Player.createEach([
    { id: 1, name: "Player1", email: "placeholder1@example.com", teams: 1 },
    { id: 2, name: "Player2", email: "placeholder2@example.com", teams: 1 },
    { id: 3, name: "Player3", email: "placeholder3@example.com", teams: 1 },
    { id: 4, name: "Player4", email: "placeholder4@example.com", teams: 1 },
    { id: 5, name: "Player5", email: "placeholder5@example.com", teams: [1, 3] },
    { id: 6, name: "Player6", email: "placeholder6@example.com", teams: [1, 2] },
    { id: 7, name: "Player7", email: "placeholder7@example.com", teams: 2 },
    { id: 8, name: "Player8", email: "placeholder8@example.com", teams: 2 },
    { id: 9, name: "Player9", email: "placeholder9@example.com", teams: 2 },
    { id: 10, name: "Player10", email: "placeholder10@example.com", teams: 2 },
    { id: 11, name: "Player11", email: "placeholder11@example.com", teams: 2 },
    { id: 12, name: "Player12", email: "placeholder12@example.com", teams: 3 },
    { id: 13, name: "Player13", email: "bite@tamere.com", teams: [3, 1] },
    { id: 14, name: "Player14", email: "placeholder14@example.com", teams: 3 },
    { id: 15, name: "Player15", email: "placeholder15@example.com", teams: 3 },
    { id: 16, name: "Player16", email: "placeholder16@example.com", teams: 3 },
  ]);
  await Scrim.createEach([
    { id: 1, team1: 1, team2: 2, time: new Date(2017, 12, 20, 15), state: "ended", winner: 1, loser: 2 },
    { id: 2, team1: 1, team2: 3, time: new Date(2017, 12, 21, 15) },
    { id: 3, team1: 3, team2: 2, time: new Date(2017, 12, 22, 15), state: "confirmed" },
  ]);

  // Save new bootstrap version
  await sails.helpers.fs.writeJson.with({
    destination: bootstrapLastRunInfoPath,
    json: {
      lastRunVersion: HARD_CODED_DATA_VERSION,
      lastRunAt: Date.now()
    },
    force: true
  })
  .tolerate((err)=>{
    sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `'+sails.config.appPath+'`.  Full error details: '+err.stack+'\n\n(Proceeding anyway this time...)');
  });

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
  return done();

};
