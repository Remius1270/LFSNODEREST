const expect = require('chai').expect;
const request = require('supertest')('http://localhost:1337');

describe("register (action)", function () {

  it("should return the manager created without password", function (done) {
    request
      .post("/register")
      .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
      .send({
        email:"test1@example.com",
        password:"zoupity",
        name:"Jpppppppp"
      })
      .expect(200)
      .end(function (err, res) {
        var user = res.body;
        expect(user).to.exist;
        expect(user).to.not.have.property("password");
        expect(user).to.have.property("email", "test1@example.com");
        expect(user).to.have.property("name", "Jpppppppp");
        done(err);
      });
  });

  it("should return bad request with already used email", function (done) {
    request
      .post("/register")
      .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
      .send({
        email:"admin@example.com",
        password:"abc123",
        name:"Jpppppppp"
      })
      .expect(400)
      .end(function (err, res) {
        expect(res.body).to.have.property("message", "User (probably) already exists");
        done(err);
      });
  });

  it("should create an admin user", function (done) {
    request
      .post("/register")
      .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
      .send({
        email:"test2@example.com",
        password:"zoupity",
        name:"Super Bob",
        role:2
      })
      .expect(200)
      .end(function (err, res) {
        var user = res.body;
        expect(user).to.exist;
        expect(user).to.not.have.property("password");
        expect(user).to.have.property("email", "test2@example.com");
        expect(user).to.have.property("name", "Super Bob");
        Role.findOne(user.role)
          .then(role => {
            expect(role).to.have.property("name", "Admin");
            done(err);
          })
          .catch(e => done(e));
      });
  });

});
