/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { collectCategories } from "../defaultFilters";

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
