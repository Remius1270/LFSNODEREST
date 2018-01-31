const expect = require('chai').expect;
const request = require('supertest')('http://localhost:1337');

describe("login (action)", function () {

  it("should return the record of the user without password", function (done) {
    request
      .get("/login?email=admin@example.com&password=abc123")
      .set("key", "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg")
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
      .set("key", "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg")
      .expect(404, done);
  });

  it("should return not found with invalid password", function (done) {
    request
      .get("/login?email=admin@example.com&password=something")
      .set("key", "7b14r3oV2LHhknbp5qCGDgsT0rh3JVZlUDgPJKNBPKOg")
      .expect(404, done);
  });

});
