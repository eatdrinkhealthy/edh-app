// @flow
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { httpCallFoursquareSearch } from "./foursquareApi";

if (Meteor.isServer) {
  describe("Foursquare API", function () {
    it("should match the documented format for v20170801", function () {
      // call API with Restaurant category, and Charleston coordinates
      const httpResponse = httpCallFoursquareSearch("4bf58dd8d48988d1c4941735", 32.789008, -79.932115);
      // TODO check shape of response
      assert.isObject(httpResponse);
    });
  });
}
