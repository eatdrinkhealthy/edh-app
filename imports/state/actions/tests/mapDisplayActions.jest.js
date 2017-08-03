// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { setSelectedVenue } from "../mapDisplayActions";
import { SET_SELECTED_VENUE } from "../actionTypes";

describe("Map Actions", function () {
  describe("setSelectedVenue", function () {
    it("should create a SET_SELECTED_VENUE action", function () {
      const venueId = "abc123";
      const expectedAction = {
        type: SET_SELECTED_VENUE,
        venueId,
      };

      expect(setSelectedVenue(venueId)).toEqual(expectedAction);
    });
  });
});
