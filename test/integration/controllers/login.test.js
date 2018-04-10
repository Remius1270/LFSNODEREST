const expect = require('chai').expect;
const request = require('supertest')('http://localhost:1337');

describe("login (action)", function () {

  it("should return the record of the user without password", function (done) {
    request
      .get("/login?email=admin@example.com&password=abc123")
      .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
      .expect(200)
      .end(function (err, res) {
        var user = res.body;
        expect(user).to.exist;
        expect(user).to.not.have.property("password");
        expect(user).to.have.property("email", "admin@example.com");
        done(err);
      });
  });

  it("should return not found with invalid email", function (done) {
    request
      .get("/login?email=test@example.com&password=abc123")
      .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
      .expect(404)
      .end(function (err, res) {
        expect(res.body).to.have.property("message", "The credentials do not match any manager");
        done(err);
      });
  });

  it("should return not found with invalid password", function (done) {
    request
      .get("/login?email=admin@example.com&password=something")
      .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
      .expect(404)
      .end(function (err, res) {
        expect(res.body).to.have.property("message", "The email and passwords do not match");
        done(err);
      });
  });

});
