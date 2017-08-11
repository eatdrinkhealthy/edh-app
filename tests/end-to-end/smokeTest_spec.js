// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* global browser */

import el from "./elements";
import DEFAULT_FILTER_LIST from "../../imports/state/data/defaultFilters";

describe("Smoke Test", function () {
  describe("Landing Page", function () {
    it("displays the map and navbar as the main page", function () {
      browser.url(el.baseUrl);

      expect(browser.getTitle()).toEqual("Eat Drink Healthy");
      expect(browser.waitForExist(el.locationsMapComponent)).toBe(true);
      expect(browser.waitForExist(el.navbarComponent)).toBe(true);
    });

    it("displays at least one map marker - NOTE may fail based on location", function () {
      browser.url(el.baseUrl);
      browser.waitForExist(el.markerComponent);

      const markerArray = browser.elements(el.markerComponent).value;

      expect(markerArray.length).toBeGreaterThan(1);
    });
  });

  describe("Filter Page", function () {
    it("displays the filter page when filter link clicked", function () {
      browser.url(el.baseUrl);
      browser.waitForExist(el.filterLinkComponent);
      browser.click(el.filterLinkComponent);

      expect(browser.waitForExist(el.filterListComponent)).toBe(true);
    });

    it("has a toggle component for each filter", function () {
      browser.url(`${el.baseUrl}/filter`);
      browser.waitForExist(el.filterListComponent);

      const numberOfFilterToggles = browser.elements(el.filterToggleComponent).value.length;

      expect(numberOfFilterToggles).toBe(DEFAULT_FILTER_LIST.length);
    });

    it("has default filters set", function () {
      browser.url(`${el.baseUrl}/filter`);
      browser.waitForExist(el.filterListComponent);

      const defaultFiltersOn = DEFAULT_FILTER_LIST.filter(filter => filter.on);
      const togglesOn = "input:checked";
      const numberTogglesOn = browser.elements(togglesOn).value.length;

      expect(numberTogglesOn).toBe(defaultFiltersOn.length);
    });

    it("returns to the landing page when 'x' is clicked", function () {
      browser.url(`${el.baseUrl}/filter`);
      browser.waitForExist(el.filterListComponent);
      browser.click(el.filterCloseLink);

      expect(browser.waitForExist(el.navbarComponent)).toBe(true);
    });

    it("returns more results when more filters clicked - NOTE may fail based on location", function () {
      // go to the filter page
      browser.url(`${el.baseUrl}/filter`);
      browser.waitForExist(el.filterListComponent);

      // get all the unchecked filter toggle elements, and click them
      const filterTogglesUnchecked = browser.elements(el.filterToggleUnchecked).value;
      filterTogglesUnchecked.forEach(elem => elem.click());

      // go to the map (landing page)
      browser.click(el.filterCloseLink);
      browser.waitForExist(el.markerComponent, 3000); // allow for some api response time

      // check that there are many more results
      const markerArray = browser.elements(el.markerComponent).value;
      expect(markerArray.length).toBeGreaterThan(10);
    });
  });

  describe("Sidebar / sign-in Page", function () {
    it("displays the sidebar when hamburger clicked", function () {
      browser.url(el.baseUrl);
      browser.waitForExist(el.hamburger);
      browser.click(el.hamburger);

      expect(browser.waitForExist(el.sidebarComponent)).toBe(true);
    });

    it("goes back to landing page when home link clicked", function () {
      browser.url(`${el.baseUrl}/sidebar`);
      browser.waitForExist(el.homeLinkComponent);
      browser.click(el.homeLinkComponent);

      expect(browser.waitForExist(el.navbarComponent)).toBe(true);
    });
  });
});
