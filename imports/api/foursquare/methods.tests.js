// @flow
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";

if (Meteor.isServer) {
  describe("Foursquare API methods", function () {
    describe("getFilteredFoursquarePlaces", function () {
      it.skip("should list this test", function () {
        assert.equal(1, 1);
      });
    });
  });
}
