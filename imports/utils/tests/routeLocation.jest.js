// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import {
  searchObject,
  searchProperty,
} from "../routeLocation";

describe("searchObject", function () {
  it("should return an empty object when passed null", function () {
    const location = null;
    expect(searchObject(location)).toEqual({});
  });

  it("should return an empty object when passed undefined", function () {
    const location = undefined;
    expect(searchObject(location)).toEqual({});
  });

  it("should return an empty object when passed no arguments", function () {
    expect(searchObject()).toEqual({});
  });

  it("should return empty object when passed location object without search property", function () {
    const location = { pathname: "a" };
    expect(searchObject(location)).toEqual({});
  });

  it("should return empty object when passed location object with search property empty", function () {
    const location = { search: "" };
    expect(searchObject(location)).toEqual({});
  });

  it("should return a populated object from location search string", function () {
    const location = { search: "?one=1&two=2&three=3" };
    expect(searchObject(location)).toEqual({ one: "1", two: "2", three: "3" });
  });

  it("should return a array populated object location search repeats property names", function () {
    const location = { search: "?one=1&one=2&one=true" };
    expect(searchObject(location)).toEqual({ one: ["1", "2", "true"] });
  });
});

describe("searchProperty", function () {
  it("should return undefined when passed a property name that doesn't exist", function () {
    const location = { search: "?one=1&two=2&three=3" };
    expect(searchProperty(location, "action")).toBeUndefined();
  });

  it("should return undefined when passed an undefined location", function () {
    const location = undefined;
    expect(searchProperty(location, "action")).toBeUndefined();
  });

  it("should return undefined when passed a null location", function () {
    const location = null;
    expect(searchProperty(location, "action")).toBeUndefined();
  });

  it("should return the value of the location search property as a string", function () {
    const location = { search: "?one=1" };
    expect(searchProperty(location, "one")).toBe("1");
  });
});
