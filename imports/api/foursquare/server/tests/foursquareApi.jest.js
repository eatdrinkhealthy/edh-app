// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import {
  parseFoursquareResponse,
  httpCallFoursquareSearch,
} from "../foursquareApi";
import httpTestResponse from "./foursquareApiData";

describe("parseFoursquareResponse", function () {
  it("should parse venue data from api response", function () {
    const parsedResponse = parseFoursquareResponse(httpTestResponse);

    expect(Array.isArray(parsedResponse)).toBe(true);
    expect(parsedResponse.length).toBe(24);

    expect(parsedResponse[0].id).toEqual("4b5f8468f964a52011bf29e3");
    expect(parsedResponse[0].name).toEqual("Starbucks");
    expect(parsedResponse[0].location.address).toEqual("239 King St");
    expect(parsedResponse[0].location.city).toEqual("Charleston");
    expect(parsedResponse[0].location.postalCode).toEqual("29401");
    expect(parsedResponse[0].location.lat).toEqual(32.78122634);
    expect(parsedResponse[0].location.lng).toEqual(-79.93341592);
    expect(parsedResponse[0].primaryCategory).toEqual("Coffee Shop");

    expect(parsedResponse[5].id).toEqual("4b192e86f964a520d8d823e3");
    expect(parsedResponse[5].name).toEqual("City Lights Coffee");

    expect(parsedResponse[23].id).toEqual("57afaa93498e56f85192e68e");
    expect(parsedResponse[23].name).toEqual("Camino Roasters");
  });

  it("should return an empty array, when parsing an api exception result", function () {
    const exceptionHttpResult = {
      statusCode: null,
      content: null,
      data: null,
      headers: {},
    };

    expect(parseFoursquareResponse(exceptionHttpResult)).toEqual([]);
  });
});

describe("httpCallFoursquareSearch", function () {
  let origConsole;

  beforeAll(() => {
    origConsole = global.console;
    global.console = { error: jest.fn() };
  });

  afterAll(() => {
    global.console = origConsole;
  });

  it("should return an empty httpResponse if throwing an exception (client_id undefined)", function () {
    const exceptionHttpResult = {
      statusCode: null,
      content: null,
      data: null,
      headers: {},
    };

    // NOTE: currently, client_id (Meteor.settings.foursquare.client_id) is not set,
    //       which causes an exception.
    //       Sending 0, 0 lat lng will also cause an exception
    expect(httpCallFoursquareSearch("4c2cd86ed066bed06c3c5209", 0, 0)).toEqual(exceptionHttpResult);
    expect(global.console.error).toHaveBeenCalled();
  });
});
