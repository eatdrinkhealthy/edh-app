// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies, import/first */
jest.mock("../foursquareApi");

import { buildSearchString, collectSearchResults } from "../methods";
import foursquareApiSearch from "../foursquareApi";
import type { IEatDrinkFilter } from "../../../../state/reducers/eatDrinkFiltersReducers";

describe("Methods", function () {
  describe("getNearbyPlaces", function () {
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

    describe("buildSearchString - helper function", function () {
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
      it("should call NOT foursquareApi when no filters selected", function () {
        collectSearchResults(0, 0, [], []);
        expect(foursquareApiSearch).not.toHaveBeenCalled();
      });

      it("should return an empty array (no search results) when no filters selected", function () {
        expect(collectSearchResults(0, 0, [], [])).toEqual([]);
      });

      it("should call foursquareApi with user selected filters", function () {
        collectSearchResults(0, 0, eatDrinkFilters, venueTypeFilters);
        expect(foursquareApiSearch).toHaveBeenCalledWith("1,2,3,4", 0, 0);
      });
    });
  });
});
