// @flow
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

const baseUrl = "http://localhost:3000";

describe("Smoke Test", function () {
  it("displays the map and navbar as the main page", function () {
    browser.url(baseUrl);
    expect(browser.getTitle()).toEqual("Eat Drink Healthy");
  });
});
