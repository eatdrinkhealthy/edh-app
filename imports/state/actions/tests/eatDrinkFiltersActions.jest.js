// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { toggleEatDrinkFilter } from "../eatDrinkFiltersActions";
import { TOGGLE_EAT_DRINK_FILTER } from "../actionTypes";

describe("Eat Drink Filter Actions", function() {
  describe("toggleEatDrinkFilter", function() {
    it("should create a SET_EAT_DRINK_FILTER action", function() {
      const id = "abc";
      const expectedAction = {
        type: TOGGLE_EAT_DRINK_FILTER,
        id,
      };

      expect(toggleEatDrinkFilter(id)).toEqual(expectedAction);
    });
  });
});
