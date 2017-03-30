// @flow
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { getNearbyPlaces } from "./methods";

if (Meteor.isServer) {
  describe("methods", function () {
    describe("getNearbyPlaces", function () {
      it("should return a list of the foursquare category codes [UPDATE]", function () {
        // TODO this test will be obsolete once the method begins to return real data
        const context = {};
        const args = {
        };

        assert.throws(() => {
          getNearbyPlaces._execute(context, args);
        }, Meteor.Error, /validation-error/);
      });
    });
  });
}
