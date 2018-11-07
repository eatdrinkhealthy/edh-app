/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { validateUserField } from "../userSchema";

describe("User SimpleSchema field validation", function() {
  it("should return undefined when there are no validation errors", function() {
    expect(validateUserField("username", "abcd")).toBeUndefined();
  });

  it("should return validation error string for username too short", function() {
    expect(validateUserField("username", "abc")).toEqual(
      "Username must be at least 4 characters.",
    );
  });
});
