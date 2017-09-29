// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies, import/first */
import lookupErrorMessage from "../errors";

describe("lookupErrorMessage", function () {
  it("should return a default message when can't match error", function () {
    expect(lookupErrorMessage("unknown error code"))
      .toEqual("Unable to fulfill request at this time. Please try again later.");
  });

  it("should return a default message when passed undefined", function () {
    expect(lookupErrorMessage(undefined))
      .toEqual("Unable to fulfill request at this time. Please try again later.");
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

  it("should return the same error message for 'User not found' and 'Incorrect password'", function () {
    expect(lookupErrorMessage("User not found"))
      .toEqual(lookupErrorMessage("Incorrect password"));
  });
});
