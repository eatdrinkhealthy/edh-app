// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* global browser */

import { elements as els, baseUrl } from "./elements";
import {
  EAT_DRINK_FILTERS,
  VENUE_TYPE_FILTERS,
} from "../../imports/state/data/defaultFilters";

describe("Primary Filters", function () {
  it("has a pill component for each 'Eat / Drink' filter", function () {
    browser.url(baseUrl);
    browser.waitForExist(els.homePage.eatDrinkFilters);

    EAT_DRINK_FILTERS.forEach((filter) => {
      expect(browser.waitForExist(`[name='${filter.id}']`)).toBe(true);
    });
  });

  it("has a pill component for each 'Venue Type' filter", function () {
    browser.url(baseUrl);
    browser.waitForExist(els.homePage.venueTypeFilters);

    VENUE_TYPE_FILTERS.forEach((filter) => {
      expect(browser.waitForExist(`[name='${filter.id}']`)).toBe(true);
    });
  });

  it("shows more map markers when more search criteria are selected - NOTE may fail based on location", function () {
    // NOTE: setGeoLocation will be deprecated
    browser.setGeoLocation({ latitude: 32.789008, longitude: -79.932115, altitude: 10 });

    browser.url(baseUrl);
    browser.waitForExist(els.homePage.eatDrinkFilters);

    // check that there no search results (at this time, default /initial search has no results)
    let markerArray = browser.elements(els.markerComponent).value;
    expect(markerArray.length).toBe(0);

    // get and click a popular filter (with search results)
    const coffeeShopPill = browser.element("[name='coffeeShop']");
    expect(coffeeShopPill.getAttribute("class")).toBe("pill");
    coffeeShopPill.click();
    expect(coffeeShopPill.getAttribute("class")).toBe("pill pill_selected");

    browser.waitForExist(els.markerComponent, 7000); // allow for some api response time

    // check that there are many more results
    markerArray = browser.elements(els.markerComponent).value;
    expect(markerArray.length).toBeGreaterThan(5);
  });

  it("shows no map markers when no search criteria are selected", function () {
    // NOTE: setGeoLocation will be deprecated
    browser.setGeoLocation({ latitude: 32.789008, longitude: -79.932115, altitude: 10 });

    browser.url(baseUrl);
    browser.waitForExist(els.homePage.eatDrinkFilters);

    // deselect any search criteria
    const selectedFilterButtons = browser.elements(".pill_selected");
    selectedFilterButtons.value.forEach(filterButton => filterButton.click());
    expect(browser.elements(".pill_selected").value.length).toBe(0);

    // check that there no search results
    browser.waitUntil(
      () => browser.elements(els.markerComponent).value.length === 0,
      6000,
      "expected no search results after deselecting any filters and waiting 6 seconds",
      2000,
    );
  });
});
