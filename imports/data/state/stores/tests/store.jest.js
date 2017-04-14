// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import store, { defaultState } from "../store";
import filtersReducer from "../../reducers/filtersReducers";
import searchResultsReducer from "../../reducers/searchResultsReducers";
import { setSearchResults } from "../../actions/searchResultsActions";
import { setFilter } from "../../actions/filtersActions";

describe("store - smoke test", function () {
  it("should return a default state", function () {
    expect(store.getState()).toEqual(defaultState);
  });

  it("should return the initial state of filters reducer", function () {
    const unknownAction = { type: "unknown", id: "a", checked: false };
    expect(store.getState().filters).toEqual(filtersReducer(undefined, unknownAction));
  });

  it("should return the initial state of the searchResults reducer", function () {
    const unknownAction = {
      type: "unknown",
      searchResults: [{ id: "a", name: "place", location: { lat: 0, lng: 0 } }],
    };
    expect(store.getState().searchResults).toEqual(searchResultsReducer(undefined, unknownAction));
  });

  it("should handle a setFilter action", function () {
    store.dispatch(setFilter("bakery", true)); // 5th filter in defaultFilters
    expect(store.getState().filters[4].on).toEqual(true);
  });

  it("should handle a setSearchResults action", function () {
    const nextState = [
      { id: "1", name: "cafe1", location: { lat: 32.7842149282925, lng: -79.93963580270426 } },
      { id: "2", name: "cafe2", location: { lat: 32.7842149282936, lng: -79.93963580270437 } },
      { id: "3", name: "cafe3", location: { lat: 32.7842149282947, lng: -79.93963580270448 } },
    ];

    store.dispatch(setSearchResults(nextState));
    expect(store.getState().searchResults).toEqual(nextState);
  });
});
