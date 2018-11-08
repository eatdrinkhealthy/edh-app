// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { toggleVenueTypeFilter } from "../venueTypeFiltersActions";
import { TOGGLE_VENUE_TYPE_FILTER } from "../actionTypes";

describe("Eat Drink Filter Actions", function() {
  describe("toggleVenueTypeFilter", function() {
    it("should create a SET_VENUE_TYPE_FILTER action", function() {
      const id = "abc";
      const expectedAction = {
        type: TOGGLE_VENUE_TYPE_FILTER,
        id,
      };

      expect(toggleVenueTypeFilter(id)).toEqual(expectedAction);
    });
  });
});
