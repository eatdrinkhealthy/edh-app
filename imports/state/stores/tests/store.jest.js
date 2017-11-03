// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import store, { defaultState } from "../store";
import filtersReducer from "../../reducers/filtersReducers";
import { setFilter } from "../../actions/filtersActions";
import eatDrinkFiltersReducer from "../../reducers/eatDrinkFiltersReducers";
import { toggleEatDrinkFilter } from "../../actions/eatDrinkFiltersActions";
import searchResultsReducer from "../../reducers/searchResultsReducers";
import { setSearchResults } from "../../actions/searchResultsActions";
import mapDisplayReducer from "../../reducers/mapDisplayReducers";
import { setSelectedVenue } from "../../actions/mapDisplayActions";
import sampleVenues from "./sampleVenueData";

describe("store - smoke test", function () {
  it("should return a default state", function () {
    expect(store.getState()).toEqual(expect.objectContaining(defaultState));
  });

  describe("filters state", function () {
    it("should return the initial state of filters reducer", function () {
      const unknownAction = { type: "unknown", id: "a", checked: false };
      expect(store.getState().filters).toEqual(filtersReducer(undefined, unknownAction));
    });

    it("should handle a setFilter action", function () {
      store.dispatch(setFilter("bakery", true)); // 5th filter in defaultFilters
      expect(store.getState().filters[4].on).toEqual(true);
    });
  });

  describe("eat drink filters state", function () {
    it("should return the initial state of eat drink filters reducer", function () {
      const unknownAction = { type: "unknown", id: "a" };
      expect(store.getState().eatDrinkFilters)
        .toEqual(eatDrinkFiltersReducer(undefined, unknownAction));
    });

    it("should handle a toggleEatDrinkFilter action", function () {
      store.dispatch(toggleEatDrinkFilter("vegan"));
      expect(store.getState().eatDrinkFilters[0].on).toEqual(true);
    });
  });

  describe("searchResults state", function () {
    it("should return the initial state of the searchResults reducer", function () {
      const unknownAction = { type: "unknown", searchResults: [sampleVenues[0]] };
      expect(store.getState().searchResults)
        .toEqual(searchResultsReducer(undefined, unknownAction));
    });

    it("should handle a setSearchResults action", function () {
      const nextState = [
        sampleVenues[0],
        sampleVenues[1],
        sampleVenues[2],
      ];

      store.dispatch(setSearchResults(nextState));
      expect(store.getState().searchResults).toEqual(nextState);
    });
  });

  describe("mapDisplay state", function () {
    it("should return the initial state of the mapDisplay reducer", function () {
      const unknownAction = { type: "unknown", venueId: "abc" };
      expect(store.getState().mapDisplay).toEqual(mapDisplayReducer(undefined, unknownAction));
    });

    it("should handle a setSelectedVenue action", function () {
      store.dispatch(setSelectedVenue("abc"));
      expect(store.getState().mapDisplay.selectedVenueId).toEqual("abc");
    });
  });
});
