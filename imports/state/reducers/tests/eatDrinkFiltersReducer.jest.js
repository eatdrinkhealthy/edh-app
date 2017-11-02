// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import eatDrinkFiltersReducer, { setEatDrinkFilter } from "../eatDrinkFiltersReducers";
import EAT_DRINK_FILTER_LIST from "../../data/defaultFilters";
import {
  setEatDrinkFilter as setEatDrinkFilterActionCreator,
} from "../../actions/eatDrinkFiltersActions";

describe("eatDrinkFilters reducer", function () {
  const unknownAction = { type: "unknown", id: "a", checked: false };

  it("should return an initial state of EAT_DRINK_FILTER_LIST", function () {
    expect(eatDrinkFiltersReducer(undefined, unknownAction)).toEqual(EAT_DRINK_FILTER_LIST);
  });

  it("should return the previous state for any unknown action", function () {
    const previousState = [
      { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
    ];

    const nextState = eatDrinkFiltersReducer(previousState, unknownAction);
    expect(nextState).toEqual(previousState);
  });

  it("should handle SET_EAT_DRINK_FILTER action", function () {
    const previousState = [
      { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
      { id: "2", name: "Juice Bar 2", on: false, foursquareCategory: "def" },
      { id: "3", name: "Juice Bar 3", on: false, foursquareCategory: "ghi" },
    ];
    const expectedResult = [
      { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
      { id: "2", name: "Juice Bar 2", on: false, foursquareCategory: "def" },
      { id: "3", name: "Juice Bar 3", on: true, foursquareCategory: "ghi" },
    ];

    const setFilterAction = setEatDrinkFilterActionCreator("3", true);
    const nextState = eatDrinkFiltersReducer(previousState, setFilterAction);
    expect(nextState).toEqual(expectedResult);
  });

  describe("setEatDrinkFilter function", function () {
    // eslint-disable-next-line prefer-const
    let previousState = [
      { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
      { id: "2", name: "Juice Bar 2", on: false, foursquareCategory: "def" },
      { id: "3", name: "Juice Bar 3", on: false, foursquareCategory: "ghi" },
    ];
    const copyState = [...previousState];
    const newState = setEatDrinkFilter(previousState, "2", true);

    it("should only set the 'on' property of indicated filter", function () {
      expect(newState).toEqual([
        { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
        { id: "2", name: "Juice Bar 2", on: true, foursquareCategory: "def" },
        { id: "3", name: "Juice Bar 3", on: false, foursquareCategory: "ghi" },
      ]);
    });

    it("should not mutate previous state", function () {
      expect(previousState).toEqual(copyState);  // does not mutate previous state
    });

    it("should return previous state if 'id' is not found", function () {
      const originalState = [
        { id: "1", name: "Juice Bar 1", on: true, foursquareCategory: "abc" },
        { id: "2", name: "Juice Bar 2", on: false, foursquareCategory: "def" },
      ];

      const setFilterAction = setEatDrinkFilterActionCreator("3", true);
      const nextState = eatDrinkFiltersReducer(originalState, setFilterAction);
      expect(nextState).toEqual(originalState);
    });
  });
});
