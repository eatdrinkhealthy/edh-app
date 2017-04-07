// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import searchResults from "../searchResults";
import { setSearchResults } from "../../actions/actionCreators";

// eslint-disable-next-line no-duplicate-imports
import type { ISearchResultsAction } from "../../actions/actionCreators";

describe("searchResults reducer", function () {
  const unknownAction: ISearchResultsAction = {
    type: "unknown",
    searchResults: [{ id: "a", name: "place", location: {} }],
  };

  it("should return an initial state of an empty array (no search results)", function () {
    const initialState = searchResults(undefined, unknownAction);
    expect(initialState).toEqual([]);
  });

  it("should handle setSearchResults action", function () {
    const prevState = [];
    const nextState = [
      { id: "1", name: "cafe1", location: { lat: 32.7842149282925, lng: -79.93963580270426 } },
      { id: "2", name: "cafe2", location: { lat: 32.7842149282936, lng: -79.93963580270437 } },
      { id: "3", name: "cafe3", location: { lat: 32.7842149282947, lng: -79.93963580270448 } },
    ];

    const action = setSearchResults(nextState);
    expect(searchResults(prevState, action)).toEqual(nextState);
  });

  it("should return the previous state for any unknown action", function () {
    const prevState = [
      { id: "a", name: "cafeA", location: { lat: 32.7842149282925, lng: -79.93963580270426 } },
      { id: "b", name: "cafeB", location: { lat: 32.7842149282936, lng: -79.93963580270437 } },
      { id: "c", name: "cafeC", location: { lat: 32.7842149282947, lng: -79.93963580270448 } },
    ];

    expect(searchResults(prevState, unknownAction)).toEqual(prevState);
  });

  it("should not mutate previous state", function () {
    const prevState = [
      { id: "a", name: "cafeA", location: { lat: 32.7842149282925, lng: -79.93963580270426 } },
      { id: "b", name: "cafeB", location: { lat: 32.7842149282936, lng: -79.93963580270437 } },
      { id: "c", name: "cafeC", location: { lat: 32.7842149282947, lng: -79.93963580270448 } },
    ];
    const copyState = [...prevState];
    const nextState = [
      { id: "1", name: "cafe1", location: { lat: 32.7842149282925, lng: -79.93963580270426 } },
      { id: "2", name: "cafe2", location: { lat: 32.7842149282936, lng: -79.93963580270437 } },
      { id: "3", name: "cafe3", location: { lat: 32.7842149282947, lng: -79.93963580270448 } },
    ];

    const action = setSearchResults(nextState);
    expect(searchResults(prevState, action)).toEqual(nextState);
    expect(prevState).toEqual(copyState);
  });
});
