// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { setEatDrinkFilter } from "../eatDrinkFiltersActions";
import { SET_EAT_DRINK_FILTER } from "../actionTypes";

describe("Eat Drink Filter Actions", function () {
  describe("setEatDrinkFilter", function () {
    it("should create a SET_EAT_DRINK_FILTER action", function () {
      const id = "abc";
      const checked = true;
      const expectedAction = {
        type: SET_EAT_DRINK_FILTER,
        id,
        checked,
      };

      expect(setEatDrinkFilter(id, checked)).toEqual(expectedAction);
    });
  });
});
