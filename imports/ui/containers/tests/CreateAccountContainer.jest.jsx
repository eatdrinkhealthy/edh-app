// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies, import/first */

/* eslint-disable flowtype/require-return-type, flowtype/require-parameter-type */
jest.mock("../../components/AlertMessage", () => (
  class AlertMessage {
    static success = jest.fn();
  }
));

// NOTE, this mock overrides a global simpler mock for accounts-base
jest.mock("meteor/accounts-base", () => ({
  Accounts: {
    createUser: jest.fn(({ username, email, password }, callback) => callback()),
  },
}));
/* eslint-enable flowtype/require-return-type, flowtype/require-parameter-type */

import React from "react";
import { mount } from "enzyme";
import CreateAccountContainer, { lookupErrorMessage } from "../CreateAccountContainer";
import AlertMessage from "../../components/AlertMessage";

describe("lookupErrorMessage", function () {
  it("should return a default message when can't match error", function () {
    expect(lookupErrorMessage("unknown error code"))
      .toEqual("Unable to create a new account at this time. Please try again later.");
  });

  it("should match error message for username too short", function () {
    expect(lookupErrorMessage("Username must be at least 4 characters"))
      .toEqual("Username must be at least 4 characters.");
  });

  it("should match error message for root / admin username not allowed", function () {
    expect(lookupErrorMessage("Username failed regular expression validation"))
      .toEqual("Username can not be named 'root' or 'admin'.");
  });

  it("should match error message for email already exists", function () {
    expect(lookupErrorMessage("Email already exists."))
      .toEqual("An account with this email address already exists.");
  });
});

describe("<CreateAccountContainer />", function () {
  it("should call AlertMessage.success when Accounts.createUser is successful", function () {
    const wrapper = mount(<CreateAccountContainer />);

    const usernameInput = wrapper.find("[name='username']");
    const emailInput = wrapper.find("[name='email']");
    const passwordInput = wrapper.find("[name='password']");
    const confirmPasswordInput = wrapper.find("[name='confirmPassword']");

    // $FlowFixMe
    usernameInput.get(0).value = "user12";
    usernameInput.simulate("change", usernameInput);

    // $FlowFixMe
    emailInput.get(0).value = "user12@test.com";
    emailInput.simulate("change", emailInput);

    // $FlowFixMe
    passwordInput.get(0).value = "user12pw";
    passwordInput.simulate("change", passwordInput);

    // $FlowFixMe
    confirmPasswordInput.get(0).value = "user12pw";
    confirmPasswordInput.simulate("change", confirmPasswordInput);

    wrapper.find("input[type='submit']").simulate("submit");
    expect(AlertMessage.success).toHaveBeenCalledWith("Welcome user12!");
  });
});
