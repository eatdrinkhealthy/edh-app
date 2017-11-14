// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { venueTypeFiltersReducer, toggleVenueTypeFilter } from "../venueTypeFiltersReducers";
import { VENUE_TYPE_FILTERS } from "../../data/defaultFilters";
import {
  toggleVenueTypeFilter as toggleVenueTypeFilterActionCreator,
} from "../../actions/venueTypeFiltersActions";

describe("venueTypeFilters reducers", function () {
  describe("toggleVenueTypeFilter function", function () {
    // eslint-disable-next-line prefer-const
    let previousState = [
      { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
      { id: "2", name: "Juice Bar 2", on: false, foursquareCategory: "def" },
      { id: "3", name: "Juice Bar 3", on: false, foursquareCategory: "ghi" },
    ];
    const copyState = [...previousState];
    const newState = toggleVenueTypeFilter(previousState, "2");

    it("should only set the 'on' property of indicated filter", function () {
      expect(newState).toEqual([
        { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
        { id: "2", name: "Juice Bar 2", on: true, foursquareCategory: "def" },
        { id: "3", name: "Juice Bar 3", on: false, foursquareCategory: "ghi" },
      ]);
    });

    it("should not mutate previous state", function () {
      expect(previousState).toEqual(copyState);  // does not mutate previous state
    });

    it("should toggle/set on to true if it was undefined", function () {
      const originalState = [
        { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
        // $FlowFixMe (allowing this to break the flow type, to test defensive code
        { id: "2", name: "Juice Bar 2", foursquareCategory: "def" },
      ];
      const expectedState = [
        { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
        { id: "2", name: "Juice Bar 2", on: true, foursquareCategory: "def" },
      ];

      const toggleFilterAction = toggleVenueTypeFilterActionCreator("2");
      const nextState = venueTypeFiltersReducer(originalState, toggleFilterAction);
      expect(nextState).toEqual(expectedState);
    });
  });

  describe("venueTypeFilters reducer (toggle)", function () {
    const unknownAction = { type: "unknown", id: "a" };

    it("should return an initial state of VENUE_TYPE_FILTERS", function () {
      expect(venueTypeFiltersReducer(undefined, unknownAction)).toEqual(VENUE_TYPE_FILTERS);
    });

    it("should return the previous state for any unknown action", function () {
      const previousState = [
        { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
      ];

      const nextState = venueTypeFiltersReducer(previousState, unknownAction);
      expect(nextState).toEqual(previousState);
    });

    it("should handle TOGGLE_VENUE_TYPE_FILTER action", function () {
      const previousState = [
        { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
        { id: "2", name: "Juice Bar 2", on: false, foursquareCategory: "def" },
        { id: "3", name: "Juice Bar 3", on: false, foursquareCategory: "ghi" },
      ];
      const expectedResult = [
        { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
        { id: "2", name: "Juice Bar 2", on: false, foursquareCategory: "def" },
        { id: "3", name: "Juice Bar 3", on: true, foursquareCategory: "ghi" },
      ];

      const toggleFilterAction = toggleVenueTypeFilterActionCreator("3");
      const nextState = venueTypeFiltersReducer(previousState, toggleFilterAction);
      expect(nextState).toEqual(expectedResult);
    });

    it("should return previous state if 'id' is not found", function () {
      const originalState = [
        { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
        { id: "2", name: "Juice Bar 2", on: false, foursquareCategory: "def" },
      ];

      const toggleFilterAction = toggleVenueTypeFilterActionCreator("3");
      const nextState = venueTypeFiltersReducer(originalState, toggleFilterAction);
      expect(nextState).toEqual(originalState);
    });
  });
});
