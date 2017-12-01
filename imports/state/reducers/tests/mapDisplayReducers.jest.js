// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import mapDisplayReducer from "../mapDisplayReducers";
import {
  setSelectedVenue as setSelectedVenueActionCreator,
  setUserPosition as setUserPositionActionCreator,
} from "../../actions/mapDisplayActions";

describe("mapDisplay reducers", function () {
  const unknownAction = { type: "unknown", venueId: "abc123" };

  it("should return an initial state of nulls", function () {
    expect(mapDisplayReducer(undefined, unknownAction)).toEqual({
      selectedVenueId: null,
      userPosition: null,
    });
  });

  it("should return the previous state for any unknown action", function () {
    const previousState = {
      selectedVenueId: "xyz",
      userPosition: {
        lat: 3,
        lng: 4,
      },
    };
    const nextState = mapDisplayReducer(previousState, unknownAction);

    expect(nextState).toEqual(previousState);
  });

  it("should handle a SET_SELECTED_VENUE Action", function () {
    const previousState = {
      selectedVenueId: "abc",
      userPosition: {
        lat: 3,
        lng: 4,
      },
    };
    const expectedResult = {
      selectedVenueId: "xyz",
      userPosition: {
        lat: 3,
        lng: 4,
      },
    };

    const setSelectedVenueAction = setSelectedVenueActionCreator("xyz");
    expect(mapDisplayReducer(previousState, setSelectedVenueAction)).toEqual(expectedResult);
  });

  it("should handle a SET_USER_POSITION Action", function () {
    const previousState = {
      selectedVenueId: "xyz",
      userPosition: {
        lat: 2,
        lng: 4,
      },
    };
    const expectedResult = {
      selectedVenueId: "xyz",
      userPosition: {
        lat: 3,
        lng: 5,
      },
    };

    const setUserPositionAction = setUserPositionActionCreator({ lat: 3, lng: 5 });
    expect(mapDisplayReducer(previousState, setUserPositionAction)).toEqual(expectedResult);
  });
});

