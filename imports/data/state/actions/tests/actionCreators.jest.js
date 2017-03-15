/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import toggleFilter from "../actionCreators";
import TOGGLE_FILTER from "../actionTypes";

describe("actions", function () {
  it("should create a TOGGLE_FILTER action", function () {
    const id = "abc";
    const toggleAction = toggleFilter(id);
    const expectedAction = {
      type: TOGGLE_FILTER,
      id,
    };

    expect(toggleAction).toEqual(expectedAction);
  });
});

