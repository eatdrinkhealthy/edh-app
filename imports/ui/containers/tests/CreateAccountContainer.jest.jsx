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
import CreateAccountContainer from "../CreateAccountContainer";
import AlertMessage from "../../components/AlertMessage";
import mountCreateAccountForm from "../../components/tests/CreateAccount_helper";

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
      "Unable to fulfill request at this time. Please try again later.",
    );
  });
});
