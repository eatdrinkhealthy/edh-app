// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import {
  setSelectedVenue,
  setUserLocation,
  setMapCenter,
  setMapZoom,
} from "../mapDisplayActions";
import {
  SET_MAP_CENTER,
  SET_SELECTED_VENUE,
  SET_USER_LOCATION,
  SET_MAP_ZOOM,
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

  describe("setUserLocation", function () {
    it("should create a SET_USER_LOCATION action", function () {
      const userLocation = {
        lat: 4.5,
        lng: 5.6,
      };

      const expectedAction = {
        type: SET_USER_LOCATION,
        userLocation: {
          lat: 4.5,
          lng: 5.6,
        },
      };

      expect(setUserLocation(userLocation)).toEqual(expectedAction);
    });
  });

  describe("setMapCenter", function () {
    it("should create a SET_MAP_CENTER action", function () {
      const mapCenter = {
        lat: 2.5,
        lng: 3.6,
      };

      const expectedAction = {
        type: SET_MAP_CENTER,
        mapCenter: {
          lat: 2.5,
          lng: 3.6,
        },
      };

      expect(setMapCenter(mapCenter)).toEqual(expectedAction);
    });
  });

  describe("setMapZoom", function () {
    it("should create a SET_MAP_ZOOM action", function () {
      const expectedAction = {
        type: SET_MAP_ZOOM,
        zoom: 15,
      };

      expect(setMapZoom(15)).toEqual(expectedAction);
    });
  });
});
