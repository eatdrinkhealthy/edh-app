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

// NOTE, this mock overrides a global simpler mock for accounts-base
jest.mock("meteor/accounts-base", () => ({
  Accounts: {
    createUser: jest.fn()
      .mockImplementationOnce(({ username, email, password }, callback) => callback())
      .mockImplementationOnce(({ username, email, password }, callback) => callback({ reason: "error" })),
  },
}));

import React from "react";
import CreateAccountContainer from "../CreateAccountContainer";
import AlertMessage from "../../components/AlertMessage";
import mountFormWithInputs from "../../../utils/tests/mountFormWithInputs";

describe("<CreateAccountContainer />", function () {
  it("should call AlertMessage.success when Accounts.createUser is successful", function () {
    const wrapper = mountFormWithInputs(
      <CreateAccountContainer />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(AlertMessage.success).toHaveBeenCalledWith("Welcome user12!");
  });

  it("should call AlertMessage.warning when Accounts.createUser is unsuccessful", function () {
    const wrapper = mountFormWithInputs(
      <CreateAccountContainer />,
      {
        username: "user12",
        email: "user12@test.com",
        password: "user12pw",
        confirmPassword: "user12pw",
      },
    );

    wrapper.find("input[type='submit']").simulate("submit");
    expect(AlertMessage.warning).toHaveBeenCalledWith(
      "Unable to fulfill request at this time. Please try again later.",
    );
  });
});
