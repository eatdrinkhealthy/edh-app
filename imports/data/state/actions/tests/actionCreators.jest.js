// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import * as actions from "../actionCreators";
import { SET_FILTER, SET_SEARCH_RESULTS } from "../actionTypes";

describe("actions", function () {
  describe("setFilter", function () {
    it("should create a SET_FILTER action", function () {
      const id = "abc";
      const checked = true;
      const expectedAction = {
        type: SET_FILTER,
        id,
        checked,
      };

      expect(actions.setFilter(id, checked)).toEqual(expectedAction);
    });
  });

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
        { id: "1", name: "cafe1", location: { lat: 32.7842149282925, lng: -79.93963580270426 } },
        { id: "2", name: "cafe2", location: { lat: 32.7842149282936, lng: -79.93963580270437 } },
        { id: "3", name: "cafe3", location: { lat: 32.7842149282947, lng: -79.93963580270448 } },
      ];
      const expectedAction = {
        type: SET_SEARCH_RESULTS,
        searchResults: [
          { id: "1", name: "cafe1", location: { lat: 32.7842149282925, lng: -79.93963580270426 } },
          { id: "2", name: "cafe2", location: { lat: 32.7842149282936, lng: -79.93963580270437 } },
          { id: "3", name: "cafe3", location: { lat: 32.7842149282947, lng: -79.93963580270448 } },
        ],
      };

      expect(actions.setSearchResults(searchResults)).toEqual(expectedAction);
    });
  });
});
