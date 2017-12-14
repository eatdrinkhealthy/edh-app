// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies, import/first */

jest.mock("../../components/AlertMessage", () => (
  class AlertMessage {
    static success = jest.fn();
    static warning = jest.fn();
  }
));

// NOTE, this mock overrides a global simpler mock for Meteor.loginWithPassword
jest.mock("meteor/meteor", () => ({
  Meteor: {
    loginWithPassword: jest.fn()
      .mockImplementationOnce((username, password, callback) => callback())
      .mockImplementationOnce((username, password, callback) => callback({ reason: "User not found" })),
  },
}));

import React from "react";
import { createStore } from "redux";
import appReducer from "../../../state/reducers";
import LoginContainer from "../LoginContainer";
import AlertMessage from "../../components/AlertMessage";
import mountFormWithInputs from "../../../utils/tests/mountFormWithInputs";

describe("<LoginContainer />", function () {
  const testStore = createStore(appReducer);

  it("should call AlertMessage.success when submit (loginWithPassword) is successful", function () {
    const wrapper = mountFormWithInputs(
      <LoginContainer />,
      { usernameEmail: "user12", loginPassword: "user12pw" },
      testStore,
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(AlertMessage.success).toHaveBeenCalledWith("Welcome user12!");
  });

  it("should call AlertMessage.warning when submit (loginWithPassword) is unsuccessful", function () {
    const wrapper = mountFormWithInputs(
      <LoginContainer />,
      { usernameEmail: "user12", loginPassword: "user12pwBad" },
      testStore,
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(AlertMessage.warning).toHaveBeenCalledWith(
      "The username / email and password do not match.",
    );
  });
});
