/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { setFilter as setFilterActionCreator } from "../actionCreators";
import SET_FILTER from "../actionTypes";

describe("actions", function () {
  it("should create a SET_FILTER action", function () {
    const id = "abc";
    const checked = true;
    const setFilterAction = setFilterActionCreator(id, checked);
    const expectedAction = {
      type: SET_FILTER,
      id,
      checked,
    };

    expect(setFilterAction).toEqual(expectedAction);
  });
});

