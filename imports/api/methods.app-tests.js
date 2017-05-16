// @flow
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { getNearbyPlaces } from "./methods";

import type { IFilter } from "../data/state/reducers/filtersReducers";

if (Meteor.isClient) {
  describe("client method calls", function () {
    const testFilterList = [
      {
        id: "juiceBar",
        name: "Juice Bars",
        on: true,
        foursquareCategory: "4bf58dd8d48988d112941735",
      },
      {
        id: "veganVegRestaurant",
        name: "Vegan / Vegetarian",
        on: true,
        foursquareCategory: "4bf58dd8d48988d1d3941735",
      },
    ];

    describe("getNearbyPlaces", function () {
      it("should NOT throw but instead get callback err, when foursquareApi throws",
        function (done: () => void) {
          const args = {
            latitude: 0,
            longitude: 0,
            filterList: testFilterList,
          };

          assert.doesNotThrow(() => {
            getNearbyPlaces.call(args, function (err: Error, res: Array<IFilter>) {
              // NOTE: you need to wrap the assert, and be sure to call done, when in a callback
              //       for a Meteor method -see notes in readme for more info
              try {
                assert.isUndefined(res);
                assert.isDefined(err);
              } catch (e) {
                done(e);
              }
              done();
            });
          });
        },
      );
    });
  });
}
