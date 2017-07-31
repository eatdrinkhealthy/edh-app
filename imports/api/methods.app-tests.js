// @flow
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { getNearbyPlaces } from "./methods";

import type { IFilter } from "../data/state/reducers/filtersReducers";

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
  {
    id: "glutenFree",
    name: "Gluten Free",
    on: false,
    foursquareCategory: "4c2cd86ed066bed06c3c5209",
  },
];

if (Meteor.isServer) {
  describe("methods", function () {
    describe("getNearbyPlaces", function () {
      it("should throw when ACTUAL foursquareApi throws (lat 0, lng 0)", function () {
        const context = {};
        const args = {
          latitude: 0,
          longitude: 0,
          filterList: testFilterList,
        };

        assert.throws(() => {
          getNearbyPlaces._execute(context, args);
        }, Error, /Invalid geo coordinates/);
      });
    });
  });
}

if (Meteor.isClient) {
  describe("client method calls", function () {
    describe("getNearbyPlaces", function () {
      it("should NOT throw but instead get callback err, when foursquareApi throws",
        function (done: (Error | void) => void) {
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
