// @flow
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { getNearbyPlaces } from "./methods";

if (Meteor.isServer) {
  describe("methods", function () {
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
      {
        id: "saladPlace",
        name: "Salad Places",
        on: false,
        foursquareCategory: "4bf58dd8d48988d1bd941735",
      },
    ];

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
