// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import searchResults from "../searchResultsReducers";
import { setSearchResults } from "../../actions/searchResultsActions";
import sampleVenues from "../../stores/tests/sampleVenueData";

// eslint-disable-next-line no-duplicate-imports
import type { ISearchResultsAction } from "../../actions/searchResultsActions";

describe("searchResults reducer", function () {
  const unknownAction: ISearchResultsAction = {
    type: "unknown",
    searchResults: [sampleVenues[0]],
  };

  it("should return an initial state of an empty array (no search results)", function () {
    const initialState = searchResults(undefined, unknownAction);
    expect(initialState).toEqual([]);
  });

  it("should handle setSearchResults action", function () {
    const prevState = [];
    const nextState = [
      sampleVenues[0],
      sampleVenues[1],
      sampleVenues[2],
    ];

    const action = setSearchResults(nextState);
    expect(searchResults(prevState, action)).toEqual(nextState);
  });

  it("should return the previous state for any unknown action", function () {
    const prevState = [
      sampleVenues[0],
      sampleVenues[1],
      sampleVenues[2],
    ];

    expect(searchResults(prevState, unknownAction)).toEqual(prevState);
  });

  it("should not mutate previous state", function () {
    const prevState = [
      sampleVenues[0],
      sampleVenues[1],
      sampleVenues[2],
    ];
    const copyState = [...prevState];
    const nextState = [
      sampleVenues[3],
      sampleVenues[4],
      sampleVenues[5],
    ];

    const action = setSearchResults(nextState);
    expect(searchResults(prevState, action)).toEqual(nextState);
    expect(prevState).toEqual(copyState);
  });
});
