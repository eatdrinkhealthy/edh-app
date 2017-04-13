// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { setFilter } from "../filterActions";
import { SET_FILTER } from "../actionTypes";

describe("Filter Actions", function () {
  describe("setFilter", function () {
    it("should create a SET_FILTER action", function () {
      const id = "abc";
      const checked = true;
      const expectedAction = {
        type: SET_FILTER,
        id,
        checked,
      };

      expect(setFilter(id, checked)).toEqual(expectedAction);
    });
  });
});
