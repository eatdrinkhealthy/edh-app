// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import mapDisplayReducer from "../mapDisplayReducers";
import { setSelectedVenue as setSelectedVenueActionCreator } from "../../actions/mapDisplayActions";

describe("mapDisplay reducers", function () {
  const unknownAction = { type: "unknown", venueId: "abc123" };

  it("should return an initial state of null", function () {
    expect(mapDisplayReducer(undefined, unknownAction).selectedVenueId).toEqual(null);
  });

  it("should return the previous state for any unknown action", function () {
    const previousState = { selectedVenueId: "xyz" };
    const nextState = mapDisplayReducer(previousState, unknownAction);

    expect(nextState).toEqual(previousState);
  });

  it("should handle a SET_SELECTED_VENUE Action", function () {
    const previousState = { selectedVenueId: "abc" };
    const expectedResult = { selectedVenueId: "xyz" };

    const setSelectedVenueAction = setSelectedVenueActionCreator("xyz");
    expect(mapDisplayReducer(previousState, setSelectedVenueAction)).toEqual(expectedResult);
  });
});

