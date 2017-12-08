/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import {
  roundedLatLng,
  sameRoundedLocation,
} from "../geoLocation";

describe("geoLocation utility functions", function () {
  describe("roundedLatLng", function () {
    it("should save 7 significant digits when given greater precision", function () {
      expect(roundedLatLng({
        lat: 0.123456789,
        lng: 0.123456789,
      })).toEqual({
        lat: 0.1234568,
        lng: 0.1234568,
      });
    });

    it("should round correctly for 7th significant digit", function () {
      expect(roundedLatLng({
        lat: 0.123456729,
        lng: 0.123456729,
      })).toEqual({
        lat: 0.1234567,
        lng: 0.1234567,
      });
    });

    it("should save less than 7 significant digits when given less precision", function () {
      expect(roundedLatLng({
        lat: 0.1234,
        lng: 0.1234,
      })).toEqual({
        lat: 0.1234,
        lng: 0.1234,
      });
    });

    it("should save 7 significant digits for negative numbers too", function () {
      expect(roundedLatLng({
        lat: -0.12345678,
        lng: -0.12345678,
      })).toEqual({
        lat: -0.1234568,
        lng: -0.1234568,
      });
    });

    it("should work with whole numbers, in a nested object", function () {
      const a = {
        center: {
          lat: 1,
          lng: 2,
        },
      };

      expect(roundedLatLng(a.center)).toEqual({ lat: 1, lng: 2 });
    });
  });

  describe("sameRoundedLocation", function () {
    it("should return false when given no arguments", function () {
      expect(sameRoundedLocation()).toBe(false);
    });

    it("should return false when given one argument", function () {
      expect(sameRoundedLocation({ lat: -0.12345678, lng: -0.12345678 })).toBe(false);
    });

    it("should return false when given one undefined", function () {
      expect(sameRoundedLocation(undefined)).toBe(false);
    });

    it("should return false when given two undefineds", function () {
      expect(sameRoundedLocation(undefined, undefined)).toBe(false);
    });

    it("should return false when given one null", function () {
      expect(sameRoundedLocation(null)).toBe(false);
    });

    it("should return false when given two nulls", function () {
      expect(sameRoundedLocation(null, null)).toBe(false);
    });

    it("should return true when two locations are equal, both with precision < 7", function () {
      expect(sameRoundedLocation(
        { lat: 0.1234, lng: 0.1234 },
        { lat: 0.1234, lng: 0.1234 },
      )).toBe(true);
    });

    it("should return true when two locations are equal, both with precision of 7", function () {
      expect(sameRoundedLocation(
        { lat: 0.1234567, lng: 0.1234567 },
        { lat: 0.1234567, lng: 0.1234567 },
      )).toBe(true);
    });

    it("should return true when equal to precision of 7, but unequal greater precision", function () {
      expect(sameRoundedLocation(
        { lat: 0.12345673, lng: 0.12345671 },
        { lat: 0.123456708, lng: 0.12345672 },
      )).toBe(true);
    });

    it("should return true when equal to precision of 7, rounding any greater precision", function () {
      expect(sameRoundedLocation(
        { lat: 0.12345673, lng: 0.123456701 },
        { lat: 0.12345665, lng: 0.12345672 },
      )).toBe(true);
    });
  });
});
