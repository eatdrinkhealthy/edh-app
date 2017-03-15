// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import filtersReducer, { toggleFilter } from "../filters";
import DEFAULT_FILTER_LIST from "../../data/defaultFilters";
import toggleFilterAction from "../../actions/actionCreators";

describe("filters reducer", function () {
  const unknownAction = { type: "unknown", id: "a" };

  it("should return an initial state of DEFAULT_FILTER_LIST", function () {
    const initialState = filtersReducer(undefined, unknownAction);

    expect(initialState.filters).toEqual(DEFAULT_FILTER_LIST);
  });

  it("should return the previous state for any unknown action", function () {
    const previousState = {
      filters: [
        {
          id: "1",
          name: "Juice Bar 1",
          on: true,
          fourSquareCategory: "abc",
        },
      ],
    };

    const nextState = filtersReducer(previousState, unknownAction);
    expect(nextState).toEqual(previousState);
  });

  it("should handle TOGGLE_FILTER action", function () {
    const previousState = {
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
    const goodResult = {
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
          on: true,
          fourSquareCategory: "ghi",
        },
      ],
    };
    const toggleAction = toggleFilterAction("3");
    const nextState = filtersReducer(previousState, toggleAction);

    expect(nextState).toEqual(goodResult);
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
    const copyState = { ...previousState };
    const newState = toggleFilter(previousState, "2");

    it("should only toggle the 'on' property of indicated filter", function () {
      expect(newState).toEqual({
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
            on: true,
            fourSquareCategory: "def",
          },
          {
            id: "3",
            name: "Juice Bar 3",
            on: false,
            fourSquareCategory: "ghi",
          },
        ],
      });
    });

    it("should not mutate previous state", function () {
      expect(previousState).toEqual(copyState);  // does not mutate previous state
    });
  });
});
