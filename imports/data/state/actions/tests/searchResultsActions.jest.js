// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import * as actions from "../searchResultsActions";
import sampleVenues from "../../stores/tests/sampleVenueData";
import { SET_SEARCH_RESULTS } from "../actionTypes";

describe("Search Results Actions", function () {
  describe("setSearchResults", function () {
    it("should create a SET_SEARCH_RESULTS action, with no search results", function () {
      const expectedAction = {
        type: SET_SEARCH_RESULTS,
        searchResults: [],
      };

      expect(actions.setSearchResults([])).toEqual(expectedAction);
    });

    it("should create a SET_SEARCH_RESULTS action, with search results", function () {
      const searchResults = [
        sampleVenues[0],
        sampleVenues[1],
        sampleVenues[2],
      ];

      const expectedAction = {
        type: SET_SEARCH_RESULTS,
        searchResults: [
          sampleVenues[0],
          sampleVenues[1],
          sampleVenues[2],
        ],
      };

      expect(actions.setSearchResults(searchResults)).toEqual(expectedAction);
    });
  });
});
