// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import filtersReducer, { toggleFilter } from "../filters";
import DEFAULT_FILTER_LIST from "../../data/defaultFilters";

describe("filters reducer", function () {
  it("should return an initial state of DEFAULT_FILTER_LIST", function () {
    const unknownAction = { type: "unknown", id: "a" };
    const initialState = filtersReducer(undefined, unknownAction);

    expect(initialState.filters).toEqual(DEFAULT_FILTER_LIST);
  });

  it.skip("should return the previous state for any unknown action", function () {
  });

  describe("toggleFilter function", function () {
    let previousState = { // eslint-disable-line prefer-const
      filters: [
        {
          id: "1",
          name: "Juice Bar 1",
          on: true,
          fourSquareCategory: "abc",
        },
        {
          id: "2",
          name: "Juice Bar 2",
          on: false,
          fourSquareCategory: "def",
        },
        {
          id: "3",
          name: "Juice Bar 3",
          on: false,
          fourSquareCategory: "ghi",
        },
      ],
    };

    it("should toggle the 'on' property of indicated filter", function () {
      const copyState = { ...previousState };
      const newState = toggleFilter(previousState, "2");

      expect(newState.filters[1].on).toBe(true);        // correctly assigns new state
      expect(previousState).toEqual(copyState);  // does not mutate previous state
    });
  });
});
