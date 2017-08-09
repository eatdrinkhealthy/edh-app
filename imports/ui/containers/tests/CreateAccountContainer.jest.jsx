// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies, import/first */

/* eslint-disable flowtype/require-return-type, flowtype/require-parameter-type */
jest.mock("../../components/AlertMessage", () => (
  class AlertMessage {
    static success = jest.fn();
    static warning = jest.fn();
  }
));

// NOTE, this mock overrides a global simpler mock for accounts-base
jest.mock("meteor/accounts-base", () => ({
  Accounts: {
    createUser: jest.fn()
      .mockImplementationOnce(({ username, email, password }, callback) => callback())
      .mockImplementationOnce(({ username, email, password }, callback) => callback("error")),
  },
}));
/* eslint-enable flowtype/require-return-type, flowtype/require-parameter-type */

import React from "react";
import CreateAccountContainer, { lookupErrorMessage } from "../CreateAccountContainer";
import AlertMessage from "../../components/AlertMessage";
import { mountCreateAccountForm } from "../../components/tests/CreateAccount.jest";

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
    const wrapper = mountCreateAccountForm(
      <CreateAccountContainer />,
      "user12",
      "user12@test.com",
      "user12pw",
      "user12pw",
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(AlertMessage.success).toHaveBeenCalledWith("Welcome user12!");
  });

  it("should call AlertMessage.warning when Accounts.createUser is unsuccessful", function () {
    const wrapper = mountCreateAccountForm(
      <CreateAccountContainer />,
      "user12",
      "user12@test.com",
      "user12pw",
      "user12pw",
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(AlertMessage.warning).toHaveBeenCalledWith(
      "Unable to create a new account at this time. Please try again later.",
    );
  });
});
