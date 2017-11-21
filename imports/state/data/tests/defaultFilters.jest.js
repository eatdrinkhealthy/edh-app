/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { collectCategories, defaultSearch } from "../defaultFilters";

describe("collectCategories", function () {
  it("should return a comma separated string of categories, when passed an array of objects", function () {
    const testCategories = [
      { id: "hfs1", name: "Health Food Store 1", foursquareCategory: "1" },
      { id: "hfs2", name: "Health Food Store 2", foursquareCategory: "2" },
    ];

    expect(collectCategories(testCategories)).toBe("1,2");
  });

  it("should return an empty string, when passed an empty array", function () {
    expect(collectCategories([])).toBe("");
  });
});

describe("defaultSearch", function () {
  it("should be a predefined string of category ids", function () {
    expect(defaultSearch)
      .toBe("4bf58dd8d48988d16d941735,4c2cd86ed066bed06c3c5209,4bf58dd8d48988d1bd941735,"
        + "4bf58dd8d48988d1c4941735,4bf58dd8d48988d1d3941735,4bf58dd8d48988d1fa941735,"
        + "4bf58dd8d48988d118951735,52f2ab2ebcbc57f1066b8b45,52f2ab2ebcbc57f1066b8b46,"
        + "52f2ab2ebcbc57f1066b8b1c,52f2ab2ebcbc57f1066b8b2c,50be8ee891d4fa8dcc7199a7,"
        + "4bf58dd8d48988d112941735,50aa9e744b90af0d42d5de0e,5744ccdfe4b0c0459246b4cd");
  });
});
