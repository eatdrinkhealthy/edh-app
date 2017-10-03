// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies, import/first */
import lookupErrorMessage from "../errors";

describe("lookupErrorMessage", function () {
  it("should return a default message when can't match error", function () {
    expect(
      lookupErrorMessage({
        error: 403,
        reason: "unknown error code",
      }),
    ).toEqual("Unable to fulfill request at this time. Please try again later.");
  });

  it("should return a default message when error.reason is undefined", function () {
    expect(
      lookupErrorMessage({
        error: 403,
      }),
    ).toEqual("Unable to fulfill request at this time. Please try again later.");
  });

  it("should return a default message when error.details[0].message is undefined", function () {
    expect(
      lookupErrorMessage({
        error: "validation-error",
        details: [{ notMessage: "Username must be at least 4 characters" }],
      }),
    ).toEqual("Unable to fulfill request at this time. Please try again later.");
  });

  it("should match error message for username too short", function () {
    expect(
      lookupErrorMessage({
        error: "validation-error",
        details: [{ message: "Username must be at least 4 characters" }],
      }),
    ).toEqual("Username must be at least 4 characters.");
  });

  it("should match error message for root / admin username not allowed", function () {
    expect(
      lookupErrorMessage({
        error: "validation-error",
        details: [{ message: "Username failed regular expression validation" }],

      }),
    ).toEqual("Username can not be named 'root' or 'admin'.");
  });

  it("should match error message for email already exists", function () {
    expect(
      lookupErrorMessage({
        error: 403,
        reason: "Email already exists.",
      }),
    ).toEqual("An account with this email address already exists.");
  });

  it("should return the same error message for 'User not found' and 'Incorrect password'", function () {
    expect(
      lookupErrorMessage({
        error: 403,
        reason: "User not found",
      }),
    ).toEqual(
      lookupErrorMessage({
        error: 403,
        reason: "Incorrect password",
      }));
  });
});
