// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import mapDisplayReducer from "../mapDisplayReducers";
import {
  setSelectedVenue as setSelectedVenueActionCreator,
  setUserLocation as setUserLocationActionCreator,
  setMapCenter as setMapCenterActionCreator,
  setMapZoom as setMapZoomActionCreator,
} from "../../actions/mapDisplayActions";

describe("mapDisplay reducers", function () {
  const unknownAction = { type: "unknown", venueId: "abc123" };

  it("should return an initial state of mapCenter, mapZoom and nulls", function () {
    expect(mapDisplayReducer(undefined, unknownAction)).toEqual({
      selectedVenueId: null,
      userLocation: null,
      mapCenter: { lat: 32.789008, lng: -79.932115 },
      zoom: 3,
    });
  });

  it("should return the previous state for any unknown action", function () {
    const previousState = {
      selectedVenueId: "xyz",
      userLocation: { lat: 3, lng: 4 },
      mapCenter: { lat: 7, lng: 8 },
      zoom: 12,
    };
    const nextState = mapDisplayReducer(previousState, unknownAction);

    expect(nextState).toEqual(previousState);
  });

  it("should handle a SET_SELECTED_VENUE action", function () {
    const previousState = {
      selectedVenueId: "abc",
      userLocation: { lat: 3, lng: 4 },
      mapCenter: { lat: 7, lng: 8 },
      zoom: 12,
    };
    const expectedResult = {
      selectedVenueId: "xyz",
      userLocation: { lat: 3, lng: 4 },
      mapCenter: { lat: 7, lng: 8 },
      zoom: 12,
    };

    const setSelectedVenueAction = setSelectedVenueActionCreator("xyz");
    expect(mapDisplayReducer(previousState, setSelectedVenueAction)).toEqual(expectedResult);
  });

  it("should handle a SET_USER_LOCATION action", function () {
    const previousState = {
      selectedVenueId: "xyz",
      userLocation: { lat: 2, lng: 4 },
      mapCenter: { lat: 7, lng: 8 },
      zoom: 12,
    };
    const expectedResult = {
      selectedVenueId: "xyz",
      userLocation: { lat: 3, lng: 5 },
      mapCenter: { lat: 7, lng: 8 },
      zoom: 12,
    };

    const setUserLocationAction = setUserLocationActionCreator({ lat: 3, lng: 5 });
    expect(mapDisplayReducer(previousState, setUserLocationAction)).toEqual(expectedResult);
  });

  it("should handle a SET_MAP_CENTER action", function () {
    const previousState = {
      selectedVenueId: "xyz",
      userLocation: { lat: 2, lng: 4 },
      mapCenter: { lat: 7, lng: 8 },
      zoom: 12,
    };
    const expectedResult = {
      selectedVenueId: "xyz",
      userLocation: { lat: 2, lng: 4 },
      mapCenter: { lat: 9, lng: 10 },
      zoom: 12,
    };

    const setMapCenterAction = setMapCenterActionCreator({ lat: 9, lng: 10 });
    expect(mapDisplayReducer(previousState, setMapCenterAction)).toEqual(expectedResult);
  });

  it("should only save 7 significant digits for SET_MAP_CENTER", function () {
    const previousState = {
      selectedVenueId: "xyz",
      userLocation: { lat: 2, lng: 4 },
      mapCenter: { lat: 7, lng: 8 },
      zoom: 12,
    };

    const setMapCenterAction = setMapCenterActionCreator(
      { lat: 32.789008929999, lng: -79.932115011 },
    );

    expect(mapDisplayReducer(previousState, setMapCenterAction)).toEqual({
      selectedVenueId: "xyz",
      userLocation: { lat: 2, lng: 4 },
      mapCenter: { lat: 32.7890089, lng: -79.932115 },
      zoom: 12,
    });
  });

  it("should handle a SET_MAP_ZOOM action", function () {
    const previousState = {
      selectedVenueId: "xyz",
      userLocation: { lat: 2, lng: 4 },
      mapCenter: { lat: 7, lng: 8 },
      zoom: 10,
    };
    const expectedResult = {
      selectedVenueId: "xyz",
      userLocation: { lat: 2, lng: 4 },
      mapCenter: { lat: 7, lng: 8 },
      zoom: 12,
    };

    const setMapZoomAction = setMapZoomActionCreator(12);
    expect(mapDisplayReducer(previousState, setMapZoomAction)).toEqual(expectedResult);
  });
});
