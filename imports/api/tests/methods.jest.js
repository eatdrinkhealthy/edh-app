// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from "meteor/meteor";
import { collectSearchResults } from "../methods";

import type { IFilter } from "../../data/state/data/defaultFiltersTypes";

// mock results of foursquareApiSearch(), called by collectSearchResults
/* eslint-disable flowtype/require-return-type */
jest.mock("../foursquare/foursquareApi", () => (
  jest.fn(() => ([{ id: "1", name: "testVenue1", location: {} }]))
    .mockImplementationOnce(() => ([
      { id: "2", name: "testVenue2", location: {} },
      { id: "3", name: "testVenue3", location: {} },
    ]))
    .mockImplementationOnce(() => ([
      { id: "4", name: "testVenue4", location: {} },
      { id: "5", name: "testVenue5", location: {} },
      { id: "6", name: "testVenue6", location: {} },
    ]))
));
/* eslint-enable flowtype/require-return-type */

describe("Methods", function () {
  describe("getNearbyPlaces", function () {
    describe("collectSearchResults - helper function", function () {
      const selectedTestFilters: Array<IFilter> = [
        {
          id: "saladPlace",
          name: "Salad Places",
          on: false,
          foursquareCategory: "4bf58dd8d48988d1bd941735",
        },
        {
          id: "bakery",
          name: "Bakeries",
          on: false,
          foursquareCategory: "4bf58dd8d48988d16a941735",
        },
        {
          id: "coffeeShop",
          name: "Coffee Shops",
          on: false,
          foursquareCategory: "4bf58dd8d48988d1e0931735",
        },
      ];

      const origMeteorIsServer = Meteor.isServer;

      beforeAll(() => {
        // triggers code to be run (like it would on server) in methods.js collectSearchResults
        Meteor.isServer = true;
      });

      afterAll(() => {
        Meteor.isServer = origMeteorIsServer;
      });

      it("should concat results from multiple foursquareApi calls", function () {
        // 3 test filters calls foursquareSearchApi 3x returning 1, 2, and 3 results.
        const results = collectSearchResults(0, 0, selectedTestFilters);
        expect(results.length).toBe(6);
      });

      it("should return an empty array when no filters selected foursquareApi calls", function () {
        const results = collectSearchResults(0, 0, []);
        expect(results).toEqual([]);
      });
    });
  });
});
