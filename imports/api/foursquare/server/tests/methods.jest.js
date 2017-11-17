// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies, import/first */
jest.mock("../foursquareApi");

import { Meteor } from "meteor/meteor";
import { buildSearchString, collectSearchResults } from "../methods";
import foursquareApiSearch from "../foursquareApi";
import type { IEatDrinkFilter } from "../../../../state/reducers/eatDrinkFiltersReducers";

describe("Methods", function () {
  describe("getNearbyPlaces", function () {
    describe("buildSearchString - helper function", function () {
      const eatDrinkFilters: Array<IEatDrinkFilter> = [
        { id: "vegan", name: "Vegan", on: false, foursquareCategory: "1" },
        { id: "vegetarian", name: "Vegetarian", on: false, foursquareCategory: "2" },
      ];

      const venueTypeFilters: Array<IEatDrinkFilter> = [
        { id: "restaurant", name: "Restaurant / Cafe", on: false, foursquareCategory: "3" },
        { id: "grocery", name: "Market / Store", on: false, foursquareCategory: "4" },
      ];

      const venueTypeFiltersDup: Array<IEatDrinkFilter> = [
        { id: "restaurant", name: "Restaurant / Cafe", on: false, foursquareCategory: "3" },
        { id: "grocery", name: "Market / Store", on: false, foursquareCategory: "4" },
        { id: "vegan", name: "Vegan", on: false, foursquareCategory: "1" },
      ];

      it("should return an empty string, when no filters are provided", function () {
        expect(buildSearchString([], [])).toBe("");
      });

      it("should combine eatDrinkFilters and venueTypeFilters categories in to one string", function () {
        expect(buildSearchString(eatDrinkFilters, venueTypeFilters)).toBe("1,2,3,4");
      });

      it("should combine eatDrinkFilters with NO venueTypeFilters categories in to one string", function () {
        expect(buildSearchString(eatDrinkFilters, [])).toBe("1,2");
      });

      it("should combine NO eatDrinkFilters with venueTypeFilters categories in to one string", function () {
        expect(buildSearchString([], venueTypeFilters)).toBe("3,4");
      });

      it("should filter out any duplicate eatDrinkFilters and venueTypeFilters categories", function () {
        expect(buildSearchString(eatDrinkFilters, venueTypeFiltersDup)).toBe("1,2,3,4");
      });
    });

    describe("collectSearchResults - helper function", function () {
      const origMeteorIsServer = Meteor.isServer;

      beforeAll(() => {
        // triggers code to be run (like it would on server) in methods.js collectSearchResults
        Meteor.isServer = true;
      });

      afterAll(() => {
        Meteor.isServer = origMeteorIsServer;
      });

      it("should not call foursquareApi when no filters selected", function () {
        collectSearchResults(0, 0, [], []);
        expect(foursquareApiSearch).not.toHaveBeenCalled();
      });

      it("should return an empty array when no filters selected", function () {
        const results = collectSearchResults(0, 0, [], []);
        expect(results).toEqual([]);
      });
    });
  });
});
