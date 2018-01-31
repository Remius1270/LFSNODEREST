const expect = require('chai').expect;
const request = require('supertest')('http://localhost:1337');

describe("getcompetitors (action)", function () {

  it("should return bad request for no key", function (done) {
    request
      .get("/team")
      .expect(400)
      .end(function (err, res) {
        expect(res.body).to.have.property("message", "Key not provided");
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
        expect(res.body).to.have.property("message", 'Key provided is for versions "2" but requested endpoint is in "1"');
        done(err);
      });
  });

  it("should return bad request for bad environment", function (done) {
    request
      .get("/team")
      .set("key", "ecSmVwId5g06fUOoTKIu3iXDzzly0JzIVePoVwMTloNs")
      .expect(400)
      .end(function (err, res) {
        expect(res.body).to.have.property("message", 'Key provided is for environment "production" but server is in "development"');
        done(err);
      });
  });

});
