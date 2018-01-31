const expect = require('chai').expect;
const request = require('supertest')('http://localhost:1337');

describe("getcompetitors (action)", function () {

  it("should return the list of teams close in elo", function (done) {
    request
      .get("/getcompetitors?id=1")
      .set("key", "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg")
      .expect(200)
      .end(function (err, res) {
        var teams = res.body;
        expect(teams).to.have.lengthOf(1);
        expect(teams[0]).to.have.property("name", "Team2");
        done(err);
      });
  });

  it("should return the list of teams in 3000 elo", function (done) {
    request
      .get("/getcompetitors?id=1&range=3000")
      .set("key", "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg")
      .expect(200)
      .end(function (err, res) {
        var teams = res.body;
        expect(teams).to.have.lengthOf(2);
        done(err);
      });
  });

  it("should return the list of teams in 3000 elo limited to one", function (done) {
    request
      .get("/getcompetitors?id=1&range=3000&limit=1")
      .set("key", "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg")
      .expect(200)
      .end(function (err, res) {
        var teams = res.body;
        expect(teams).to.have.lengthOf(1);
        done(err);
      });
  });

  it("should return not found for an inexisting team", function (done) {
    request
      .get("/getcompetitors?id=999")
      .set("key", "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg")
      .expect(404)
      .end(function (err, res) {
        expect(res.body).to.have.property("message", "The specified team wasnt found");
        done(err);
      });
  });

});
