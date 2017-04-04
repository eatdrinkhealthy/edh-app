// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import { parseFoursquareResponse } from "../foursquareApi";

describe("parseFoursquareResponse", function () {
  const apiResult = {
    statusCode: 200,
    content: {
      // TODO  capture some real api response content
    },
    headers: {},
  };

  it.skip("should parse venue data from api response", function () {
    //
  });
});
