const expect = require('chai').expect;

describe("Manager (model)", function () {

  describe("#customToJSON()", function () {
    it("should return the record without password", function (done) {
      Manager.findOne({ email: "admin@example.com" }).then(function (manager) {
        expect(manager, "record not found").to.exist;
        expect(manager.toJSON(), "found a password property").to.not.have.property("password");
        done();
      });
    });
  });

});
