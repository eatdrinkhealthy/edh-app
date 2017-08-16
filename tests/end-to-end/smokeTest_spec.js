// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* global browser */

import els from "./elements";
import DEFAULT_FILTER_LIST from "../../imports/state/data/defaultFilters";

describe("Smoke Test", function () {
  describe("Landing Page", function () {
    it("displays the map and navbar as the main page", function () {
      browser.url(els.baseUrl);

      expect(browser.getTitle()).toEqual("Eat Drink Healthy");
      expect(browser.waitForExist(els.locationsMapComponent)).toBe(true);
      expect(browser.waitForExist(els.navbar.component)).toBe(true);
    });

    it("displays at least one map marker - NOTE may fail based on location", function () {
      browser.url(els.baseUrl);
      browser.waitForExist(els.markerComponent);

      const markerArray = browser.elements(els.markerComponent).value;

      expect(markerArray.length).toBeGreaterThan(1);
    });
  });

  describe("Filter Page", function () {
    it("displays the filter page when filter link clicked", function () {
      browser.url(els.baseUrl);
      browser.waitForExist(els.navbar.filterLink);
      browser.click(els.navbar.filterLink);

      expect(browser.waitForExist(els.filterList.component)).toBe(true);
    });

    it("has a toggle component for each filter", function () {
      browser.url(`${els.baseUrl}/filter`);
      browser.waitForExist(els.filterList.component);

      const numberOfFilterToggles = browser.elements(els.filterList.toggle).value.length;

      expect(numberOfFilterToggles).toBe(DEFAULT_FILTER_LIST.length);
    });

    it("has default filters set", function () {
      browser.url(`${els.baseUrl}/filter`);
      browser.waitForExist(els.filterList.component);

      const defaultFiltersOn = DEFAULT_FILTER_LIST.filter(filter => filter.on);
      const togglesOn = "input:checked";
      const numberTogglesOn = browser.elements(togglesOn).value.length;

      expect(numberTogglesOn).toBe(defaultFiltersOn.length);
    });

    it("returns to the landing page when 'x' is clicked", function () {
      browser.url(`${els.baseUrl}/filter`);
      browser.waitForExist(els.filterList.component);
      browser.click(els.filterList.closeLink);

      expect(browser.waitForExist(els.navbar.component)).toBe(true);
    });

    it("returns more results when more filters clicked - NOTE may fail based on location", function () {
      // go to the filter page
      browser.url(`${els.baseUrl}/filter`);
      browser.waitForExist(els.filterList.component);

      // get all the unchecked filter toggle elements, and click them
      const filterTogglesUnchecked = browser.elements(els.filterList.toggleUnchecked).value;
      filterTogglesUnchecked.forEach(elem => elem.click());

      // go to the map (landing page)
      browser.click(els.filterList.closeLink);
      browser.waitForExist(els.markerComponent, 3000); // allow for some api response time

      // check that there are many more results
      const markerArray = browser.elements(els.markerComponent).value;
      expect(markerArray.length).toBeGreaterThan(10);
    });
  });

  describe("Sidebar / sign-in Page", function () {
    it("displays the sidebar when join link clicked", function () {
      browser.url(els.baseUrl);
      browser.waitForExist(els.navbar.joinLink);
      browser.click(els.navbar.joinLink);

      expect(browser.waitForExist(els.sidebar.component)).toBe(true);
    });

    it("goes back to landing page when home link clicked", function () {
      browser.url(`${els.baseUrl}/sidebar`);
      browser.waitForExist(els.sidebar.homeLink);
      browser.click(els.sidebar.homeLink);

      expect(browser.waitForExist(els.navbar.component)).toBe(true);
    });
  });
});
