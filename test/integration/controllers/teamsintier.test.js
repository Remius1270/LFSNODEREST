const expect = require('chai').expect;
const request = require('supertest')('http://localhost:1337');

describe("teamsintier (action)", function () {

  it("should return the list of teams in master tier", function (done) {
    request
      .get("/teamsintier?tier=master")
      .set("key", "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg")
      .expect(200)
      .end(function (err, res) {
        var teams = res.body;
        expect(teams).to.have.lengthOf(2);
        done(err);
      });
  });

  it("should return bad request for unknown tier", function (done) {
    request
      .get("/teamsintier?tier=nothing")
      .set("key", "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg")
      .expect(400)
      .end(function (err, res) {
        expect(res.body).to.have.property("message", "The specified tier does not exist");
        done(err);
      });
  });

});
