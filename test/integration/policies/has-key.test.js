const expect = require('chai').expect;
const request = require('supertest')('http://localhost:1337');

describe("has-key (policy)", function () {

  beforeEach(function (done) {
    KeyUsed.destroy({}).then(done);
  });

  it("should return bad request for no key", function (done) {
    request
      .get("/team")
      .expect(400)
      .end(function (err, res) {
        expect(res.body).to.have.property("message", "key not provided");
        done(err);
      });
  });

  it("should return bad request for bad key", function (done) {
    request
      .get("/team")
      .set("key", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
      .expect(400)
      .end(function (err, res) {
        expect(res.body).to.have.property("message", "Invalid key");
        done(err);
      });
  });

  it("should return bad request for bad version", function (done) {
    request
      .get("/team")
      .set("key", "tgssAbXYKz1f1Pref14rtgssAbXYKz1f1Pref14rsgt6")
      .expect(400)
      .end(function (err, res) {
        expect(res.body).to.have.property("message", 'key provided is for versions "2" but requested endpoint is in "1"');
        done(err);
      });
  });

  it("should return bad request for bad environment", function (done) {
    request
      .get("/team")
      .set("key", "ecSmVwId5g06fUOoTKIu3iXDzzly0JzIVePoVwMTloNs")
      .expect(400)
      .end(function (err, res) {
        expect(res.body).to.have.property("message", 'key provided is for environment "production" but server is in "development"');
        done(err);
      });
  });

  it("should return request result and log key use with good key", function (done) {
    request
      .get("/teamsintier?tier=master")
      .set("key", "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg")
      .expect(200)
      .end(function (err, res) {
        expect(res.body).to.have.lengthOf(2);
        KeyUsed.findOne({ key:1 }).then(ku => {
          // expect(ku.key).to.have.property("key", "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg");
          expect(ku).to.have.property("key", 1);
          expect(ku).to.have.property("uri", "/teamsintier");
          expect(ku).to.have.property("args", '{"tier":"master"}');
          done(err);
        });
      });
  });

});
