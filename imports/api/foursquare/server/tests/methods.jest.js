// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { Meteor } from "meteor/meteor";
import { collectSearchResults } from "../methods";
import type { IEatDrinkFilter } from "../../../../state/reducers/eatDrinkFiltersReducers";

// mock results of foursquareApiSearch(), called by collectSearchResults
/* eslint-disable flowtype/require-return-type */
jest.mock("../foursquareApi", () => (
  jest.fn(() => ([{ id: "0", name: "testVenue0", location: {} }]))
    .mockImplementationOnce(() => ([
      { id: "1", name: "testVenue1", location: {} },
      { id: "2", name: "testVenue2", location: {} },
      { id: "3", name: "testVenue3", location: {} },
    ]))
    .mockImplementationOnce(() => ([
      { id: "4", name: "testVenue4", location: {} },
      { id: "5", name: "testVenue5", location: {} },
      { id: "6", name: "testVenue6", location: {} },
    ]))
    .mockImplementationOnce(() => ([
      { id: "A", name: "testVenueA", location: {} },
      { id: "B", name: "testVenueB", location: {} },
      { id: "C", name: "testVenueC", location: {} },
    ]))
    .mockImplementationOnce(() => ([
      { id: "B", name: "testVenueB", location: {} },
      { id: "C", name: "testVenueC", location: {} },
      { id: "D", name: "testVenueD", location: {} },
    ]))
    .mockImplementationOnce(() => ([
      { id: "D", name: "testVenueD", location: {} },
      { id: "E", name: "testVenueE", location: {} },
      { id: "F", name: "testVenueF", location: {} },
    ]))
));
/* eslint-enable flowtype/require-return-type */

describe("Methods", function () {
  describe("getNearbyPlaces", function () {
    describe("collectSearchResults - helper function", function () {
      const selected2EatDrinkFilters: Array<IEatDrinkFilter> = [
        {
          id: "vegan",
          name: "Vegan",
          on: false,
          foursquareCategory: "52f2ab2ebcbc57f1066b8b1c",
        },
        {
          id: "vegetarian",
          name: "Vegetarian",
          on: false,
          foursquareCategory: "4bf58dd8d48988d1d3941735",
        },
      ];

      const selected3EatDrinkFilters: Array<IEatDrinkFilter> = [
        {
          id: "vegan",
          name: "Vegan",
          on: false,
          foursquareCategory: "52f2ab2ebcbc57f1066b8b1c",
        },
        {
          id: "vegetarian",
          name: "Vegetarian",
          on: false,
          foursquareCategory: "4bf58dd8d48988d1d3941735",
        },
        {
          id: "glutenFree",
          name: "Gluten Free",
          on: false,
          foursquareCategory: "4c2cd86ed066bed06c3c5209",
        },
      ];

      const selected2VenueTypeFilters: Array<IEatDrinkFilter> = [
        {
          id: "restaurant",
          name: "Restaurant / Cafe",
          on: false,
          foursquareCategory: "4bf58dd8d48988d1c4941735",
        },
        {
          id: "grocery",
          name: "Market / Store",
          on: false,
          foursquareCategory: "4bf58dd8d48988d118951735",
        },
      ];

      const origMeteorIsServer = Meteor.isServer;

      //
      // WARNING: until I figure out how to properly reset mockImplementation, test
      //          call order, and number of calls to collectSearchResults matter
      //
      // beforeEach(() => {
      //   NOTE: these do not seem to reset the mockImplementationOnce call results
      //   jest.resetModules();
      //   jest.clearAllMocks();
      // });

      beforeAll(() => {
        // triggers code to be run (like it would on server) in methods.js collectSearchResults
        Meteor.isServer = true;
      });

      afterAll(() => {
        Meteor.isServer = origMeteorIsServer;
      });

      it("should return an empty array when no filters selected foursquareApi calls", function () {
        const results = collectSearchResults(0, 0, [], []);
        expect(results).toEqual([]);
      });

      it("should concat results from multiple foursquareApi calls", function () {
        // call with 2 filters, foursquareSearchApi returns 1,2,3 and 4,5,6
        const results = collectSearchResults(
          0, 0, selected2EatDrinkFilters, selected2VenueTypeFilters,
        );

        expect(results).toEqual([
          { id: "1", name: "testVenue1", location: {} },
          { id: "2", name: "testVenue2", location: {} },
          { id: "3", name: "testVenue3", location: {} },
          { id: "4", name: "testVenue4", location: {} },
          { id: "5", name: "testVenue5", location: {} },
          { id: "6", name: "testVenue6", location: {} },
        ]);
      });

      it("should filter out duplicate venues", function () {
        // call with 3 filters, foursquareSearchApi returns 3 sets of results, with 3 duplicates
        const results = collectSearchResults(
          0, 0, selected3EatDrinkFilters, selected2VenueTypeFilters,
        );

        expect(results).toEqual([
          { id: "A", name: "testVenueA", location: {} },
          { id: "B", name: "testVenueB", location: {} },
          { id: "C", name: "testVenueC", location: {} },
          { id: "D", name: "testVenueD", location: {} },
          { id: "E", name: "testVenueE", location: {} },
          { id: "F", name: "testVenueF", location: {} },
        ]);
      });
    });
  });
});
