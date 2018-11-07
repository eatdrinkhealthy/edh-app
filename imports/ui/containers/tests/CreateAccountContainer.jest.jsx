// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies, import/first */

jest.mock(
  "../../components/AlertMessage",
  () =>
    class AlertMessage {
      static success = jest.fn();
      static warning = jest.fn();
    },
);

// NOTE, this mock overrides a global simpler mock for accounts-base
/* eslint-disable no-unused-vars */
jest.mock("meteor/accounts-base", () => ({
  Accounts: {
    createUser: jest
      .fn()
      .mockImplementationOnce(({ username, email, password }, callback) => callback())
      .mockImplementationOnce(({ username, email, password }, callback) =>
        callback({
          error: 403,
          reason: "unknown error",
        }),
      )
      .mockImplementationOnce(({ username, email, password }, callback) =>
        callback({
          error: "validation-error",
          reason: "Username is required",
        }),
      )
      .mockImplementationOnce(({ username, email, password }, callback) =>
        callback({
          error: 403,
          reason: "Incorrect password",
        }),
      ),
  },
}));
/* eslint-enable no-unused-vars */

import React from "react";
import { createStore } from "redux";
import appReducer from "../../../state/reducers";
import CreateAccountContainer from "../CreateAccountContainer";
import AlertMessage from "../../components/AlertMessage";
import mountFormWithInputs from "../../../utils/tests/mountFormWithInputs";
import { elements as els } from "../../../../tests/end-to-end/elements";

describe("<CreateAccountContainer />", function() {
  const testStore = createStore(appReducer);

  it("should call AlertMessage.success when Accounts.createUser is successful", function() {
    const wrapper = mountFormWithInputs(
      <CreateAccountContainer />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
      testStore,
    );

    wrapper.find(els.createAccountForm.submitButton).simulate("submit");

    // NOTE first mock call to Accounts.createUser succeeds
    expect(AlertMessage.success).toHaveBeenCalledWith("Welcome user12!");
  });

  it("should call AlertMessage.warning when Accounts.createUser returns any unknown error", function() {
    const wrapper = mountFormWithInputs(
      <CreateAccountContainer />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
      testStore,
    );

    wrapper.find(els.createAccountForm.submitButton).simulate("submit");

    // NOTE second mock call to Accounts.createUser generates general / unknown error
    expect(AlertMessage.warning).toHaveBeenCalledWith(
      "Unable to fulfill request at this time. Please try again later.",
    );
  });

  it("should call AlertMessage.warning with correct ValidationError message", function() {
    const wrapper = mountFormWithInputs(
      <CreateAccountContainer />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
      testStore,
    );

    wrapper.find(els.createAccountForm.submitButton).simulate("submit");

    // NOTE third mock call to Accounts.createUser generates a ValidationError
    expect(AlertMessage.warning).toHaveBeenCalledWith("Username is a required field.");
  });

  it("should call AlertMessage.warning with correct Meteor.Error message", function() {
    const wrapper = mountFormWithInputs(
      <CreateAccountContainer />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
      testStore,
    );

    wrapper.find(els.createAccountForm.submitButton).simulate("submit");

    // NOTE fourth mock call to Accounts.createUser generates a 403 Meteor.Error
    expect(AlertMessage.warning).toHaveBeenCalledWith(
      "The username / email and password do not match.",
    );
  });
});
