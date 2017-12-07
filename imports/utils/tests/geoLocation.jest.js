/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { roundedLatLng } from "../geoLocation";

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
});
