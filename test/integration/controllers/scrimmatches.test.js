const expect = require('chai').expect;
const request = require('supertest')('http://localhost:1337');
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

function rangeFromString(range) {
  return moment.range(range.split('/').map(b => moment(0).add(moment.duration(b))));
}

describe("scrimmatches (action)", function () {

  it("should return the list of teams with overlaping disponibilities", async function () {
    request
      .get("/scrimmatches?id=2")
      .set("key", "f4he6m7opf39qblakro1ep1jsbv104okfac5f2476ojs")
      .expect(200)
      .end(function (err, res) {
        var teams = res.body;
        expect(teams).to.have.lengthOf(1);
        expect(teams[0]).to.have.property("name", "Team3");
        done(err);
      });
  });

});
