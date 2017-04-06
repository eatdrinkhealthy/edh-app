// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { parseFoursquareResponse } from "../foursquareApi";
import httpTestResponse from "./foursquareApiData";

describe("parseFoursquareResponse", function () {
  it("should parse venue data from api response", function () {
    const parsedResponse = parseFoursquareResponse(httpTestResponse);

    expect(Array.isArray(parsedResponse)).toBe(true);
    expect(parsedResponse.length).toBe(24);

    expect(parsedResponse[0].id).toEqual("4b5f8468f964a52011bf29e3");
    expect(parsedResponse[0].name).toEqual("Starbucks");

    expect(parsedResponse[5].id).toEqual("4b192e86f964a520d8d823e3");
    expect(parsedResponse[5].name).toEqual("City Lights Coffee");

    expect(parsedResponse[23].id).toEqual("57afaa93498e56f85192e68e");
    expect(parsedResponse[23].name).toEqual("Camino Roasters");
  });
});
