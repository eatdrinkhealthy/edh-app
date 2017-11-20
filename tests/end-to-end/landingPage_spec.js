// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* global browser */

import { elements as els, baseUrl } from "./elements";

describe("Landing Page", function () {
  it("displays the map and navbar as the main page", function () {
    browser.url(baseUrl);

    expect(browser.getTitle()).toEqual("Eat Drink Healthy");
    expect(browser.waitForExist(els.mapComponent)).toBe(true);
    expect(browser.waitForExist(els.homePage.navbar)).toBe(true);
  });

  it("displays the Eat / Drink and Venues filter sections", function () {
    browser.url(baseUrl);

    expect(browser.waitForExist(els.homePage.eatDrinkFilters)).toBe(true);
    expect(browser.waitForExist(els.homePage.venueTypeFilters)).toBe(true);
  });
});
