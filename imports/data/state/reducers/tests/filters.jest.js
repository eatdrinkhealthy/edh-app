// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import filtersReducer, { setFilter } from "../filters";
import DEFAULT_FILTER_LIST from "../../data/defaultFilters";
import { setFilter as setFilterActionCreator } from "../../actions/actionCreators";

describe("filters reducer", function () {
  const unknownAction = { type: "unknown", id: "a", checked: false };

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

  it("should handle SET_FILTER action", function () {
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
    const expectedResult = {
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
    const setFilterAction = setFilterActionCreator("3", true);
    const nextState = filtersReducer(previousState, setFilterAction);

    expect(nextState).toEqual(expectedResult);
  });

  describe("setFilter function", function () {
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
    const newState = setFilter(previousState, "2", true);

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

    it("should return previous state if 'id' is not found", function () {
      const originalState = {
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
        ],
      };
      const setFilterAction = setFilterActionCreator("3", true);
      const nextState = filtersReducer(originalState, setFilterAction);
      expect(nextState).toEqual(originalState);
    });
  });
});
