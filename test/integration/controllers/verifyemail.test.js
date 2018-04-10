const expect = require('chai').expect;
const request = require('supertest')('http://localhost:1337');

describe("verifyemail (action)", function () {

  it("should return 200 and verify the email of a new user", function (done) {
    request
      .post("/register")
      .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
      .send({
        email:"test3@example.com",
        password:"zoupity",
        name:"Jpppppppp"
      })
      .expect(200)
      .end(function (err, res) {
        var user = res.body;
        expect(user).to.exist;
        Manager.findOne(user.id)
          .then(manager => {
            request
              .get("/verifyemail")
              .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
              .query({ id:manager.id, token:manager.emailVerificationToken })
              .expect(200)
              .end(function (err, res) {
                Manager.findOne(manager.id)
                  .then(manager => {
                    expect(manager).to.have.property("emailVerified", true);
                    expect(manager).to.have.property("emailVerificationToken", "");
                    done(err);
                  });
              });
          })
          .catch(done);
      });
  });

  it("should return 400 for a wrong token", function (done) {
    request
      .post("/register")
      .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
      .send({
        email:"test4@example.com",
        password:"zoupity",
        name:"Jpppppppp"
      })
      .expect(200)
      .end(function (err, res) {
        var user = res.body;
        expect(user).to.exist;
        request
          .get("/verifyemail")
          .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
          .query({ id:user.id, token:"a wrong token" })
          .expect(400)
          .end(function (err, res) {
            expect(res.body).to.have.property("message", "Wrong token");
            done(err);
          });
      });
  });

  it("should return 400 if a user tries to verify twice", function (done) {
    request
      .post("/register")
      .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
      .send({
        email:"test5@example.com",
        password:"zoupity",
        name:"Jpppppppp"
      })
      .expect(200)
      .end(function (err, res) {
        var user = res.body;
        expect(user).to.exist;
        Manager.findOne(user.id)
          .then(manager => {
            request
              .get("/verifyemail")
              .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
              .query({ id:manager.id, token:manager.emailVerificationToken })
              .expect(200)
              .end(function (err, res) {
                request
                  .get("/verifyemail")
                  .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
                  .query({ id:manager.id, token:manager.emailVerificationToken })
                  .expect(400)
                  .end(function (err, res) {
                    expect(res.body).to.have.property("message", "Email already verified");
                    done(err);
                  });
              });
          })
          .catch(done);
      });
    });
});
