// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import {
  setSelectedVenue,
  setUserPosition,
} from "../mapDisplayActions";
import {
  SET_SELECTED_VENUE,
  SET_USER_POSITION,
} from "../actionTypes";

describe("Map Display Actions", function () {
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

  describe("setUserPosition", function () {
    it("should create a SET_USER_POSITION action", function () {
      const userPosition = {
        lat: 4.5,
        lng: 5.6,
      };

      const expectedAction = {
        type: SET_USER_POSITION,
        userPosition: {
          lat: 4.5,
          lng: 5.6,
        },
      };

      expect(setUserPosition(userPosition)).toEqual(expectedAction);
    });
  });
});
