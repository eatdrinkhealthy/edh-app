/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { collectCategories, VENUE_TYPE_FILTERS } from "../defaultFilters";

describe("collectCategories", function() {
  it("should return a comma separated string of categories, when passed an array of objects", function() {
    const testCategories = [
      { id: "hfs1", name: "Health Food Store 1", foursquareCategory: "1" },
      { id: "hfs2", name: "Health Food Store 2", foursquareCategory: "2" },
    ];

    expect(collectCategories(testCategories)).toBe("1,2");
  });

  it("should return an empty string, when passed an empty array", function() {
    expect(collectCategories([])).toBe("");
  });
});

describe("defaultFilters", function() {
  describe("VENUE_TYPE_FILTERS", function() {
    describe("restaurant foursquareCategory'", function() {
      it("should be made from 'restaurantCafeCategories'", function() {
        expect(VENUE_TYPE_FILTERS[0].foursquareCategory).toBe(
          "4bf58dd8d48988d16d941735,4c2cd86ed066bed06c3c5209," +
            "4bf58dd8d48988d1bd941735,4bf58dd8d48988d1c4941735," +
            "4bf58dd8d48988d1d3941735",
        );
      });
    });

    describe("grocery foursquareCategory'", function() {
      it("should be made from 'marketGroceryCategories'", function() {
        expect(VENUE_TYPE_FILTERS[1].foursquareCategory).toBe(
          "4bf58dd8d48988d1fa941735,4bf58dd8d48988d118951735," +
            "52f2ab2ebcbc57f1066b8b45,52f2ab2ebcbc57f1066b8b46," +
            "52f2ab2ebcbc57f1066b8b1c,52f2ab2ebcbc57f1066b8b2c," +
            "50be8ee891d4fa8dcc7199a7",
        );
      });
    });

    describe("juiceBar foursquareCategory'", function() {
      it("should be made from 'juiceBarCategories'", function() {
        expect(VENUE_TYPE_FILTERS[4].foursquareCategory).toBe("4bf58dd8d48988d112941735");
      });
    });

    describe("healthFoodStore foursquareCategory'", function() {
      it("should be made from 'healthFoodStoreCategories'", function() {
        expect(VENUE_TYPE_FILTERS[5].foursquareCategory).toBe(
          "50aa9e744b90af0d42d5de0e,5744ccdfe4b0c0459246b4cd",
        );
      });
    });
  });
});
