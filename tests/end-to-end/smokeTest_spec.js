// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* global browser */

import { elements as els, baseUrl } from "./elements";
import DEFAULT_FILTER_LIST from "../../imports/state/data/defaultFilters";

describe("Smoke Test", function () {
  describe("Landing Page", function () {
    it("displays the map and navbar as the main page", function () {
      browser.url(baseUrl);

      expect(browser.getTitle()).toEqual("Eat Drink Healthy");
      expect(browser.waitForExist(els.locationsMapComponent)).toBe(true);
      expect(browser.waitForExist(els.navbar.component)).toBe(true);
    });

    it("displays at least one map marker - NOTE may fail based on location", function () {
      browser.url(baseUrl);
      browser.waitForExist(els.markerComponent, 3000); // allow for some api response time

      const markerArray = browser.elements(els.markerComponent).value;

      expect(markerArray.length).toBeGreaterThan(1);
    });
  });

  describe("Filter Page", function () {
    it("displays the filter page when filter link clicked", function () {
      browser.url(baseUrl);
      browser.waitForExist(els.navbar.filterLink);
      browser.click(els.navbar.filterLink);

      expect(browser.waitForExist(els.filterPage.component)).toBe(true);
    });

    it("has a toggle component for each filter", function () {
      browser.url(els.filterPage.url);
      browser.waitForExist(els.filterPage.component);

      const numberOfFilterToggles = browser.elements(els.filterPage.toggle).value.length;

      expect(numberOfFilterToggles).toBe(DEFAULT_FILTER_LIST.length);
    });

    it("has default filters set", function () {
      browser.url(els.filterPage.url);
      browser.waitForExist(els.filterPage.component);

      const defaultFiltersOn = DEFAULT_FILTER_LIST.filter(filter => filter.on);
      const togglesOn = "input:checked";
      const numberTogglesOn = browser.elements(togglesOn).value.length;

      expect(numberTogglesOn).toBe(defaultFiltersOn.length);
    });

    it("returns to the landing page when 'x' is clicked", function () {
      browser.url(els.filterPage.url);
      browser.waitForExist(els.filterPage.component);
      browser.click(els.filterPage.closeLink);

      expect(browser.waitForExist(els.navbar.component)).toBe(true);
    });

    it("returns more results when more filters clicked - NOTE may fail based on location", function () {
      // go to the filter page
      browser.url(els.filterPage.url);
      browser.waitForExist(els.filterPage.component);

      // get all the unchecked filter toggle elements, and click them
      const filterTogglesUnchecked = browser.elements(els.filterPage.toggleUnchecked).value;
      filterTogglesUnchecked.forEach(elem => elem.click());

      // go to the map (landing page)
      browser.click(els.filterPage.closeLink);
      browser.waitForExist(els.markerComponent, 3000); // allow for some api response time

      // check that there are many more results
      const markerArray = browser.elements(els.markerComponent).value;
      expect(markerArray.length).toBeGreaterThan(10);
    });
  });

  describe("Sidebar / sign-in Page", function () {
    it("displays the sidebar when join link clicked", function () {
      browser.url(baseUrl);
      browser.waitForExist(els.navbar.component);
      // WARNING
      //   -when searching for an element two times in a row, that is
      //   wrapped in a createContainer, the second search may fail.
      //   e.g. waitForExist(someButton), then click(someButton) may
      //   result in an 'element not found on page' error
      browser.click(els.userMenu.joinLink);

      expect(browser.waitForExist(els.sidebarPage.component)).toBe(true);
    });

    it("goes back to landing page when home link clicked", function () {
      browser.url(els.sidebarPage.url);
      browser.waitForExist(els.sidebarPage.homeLink);
      browser.click(els.sidebarPage.homeLink);

      expect(browser.waitForExist(els.navbar.component)).toBe(true);
    });
  });
});
