// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import DEFAULT_FILTER_LIST from "../../imports/data/state/data/defaultFilters";

describe("Smoke Test", function () {
  const baseUrl = "http://localhost:3000";

  const locationsMapComponent = "div.map-container";
  const navbarComponent = "div.nav > div.nav__title";
  const hamburger = ".toggle-sidebar";
  const sidebarComponent = "div.sidebar > div.pitch";
  const markerComponent = "div.markerContainer";

  describe("Landing Page", function () {
    it("displays the map and navbar as the main page", function () {
      browser.url(baseUrl);

      expect(browser.getTitle()).toEqual("Eat Drink Healthy");
      expect(browser.waitForExist(locationsMapComponent)).toBe(true);
      expect(browser.waitForExist(navbarComponent)).toBe(true);
    });

    it("displays at least one map marker - NOTE may fail based on location", function () {
      browser.url(baseUrl);
      browser.waitForExist(locationsMapComponent);

      const markerArray = browser.elements(markerComponent).value;

      expect(markerArray.length).toBeGreaterThan(1);
    });
  });

  describe("Filter Page", function () {
    const filterLinkComponent = "div=Filter";
    const filterListComponent = "div.filter";
    const filterCloseLink = "div.close-filter";

    it("displays the filter page when filter link clicked", function () {
      browser.url(baseUrl);
      browser.waitForExist(filterLinkComponent);
      browser.click(filterLinkComponent);

      expect(browser.waitForExist(filterListComponent)).toBe(true);
    });

    it("has a toggle component for each filter", function () {
      browser.url(`${baseUrl}/filter`);
      browser.waitForExist(filterListComponent);

      const filterToggleComponent = "span.react-toggle-label";
      const numberOfFilterToggles = browser.elements(filterToggleComponent).value.length;

      expect(numberOfFilterToggles).toBe(DEFAULT_FILTER_LIST.length);
    });

    it("has default filters set", function () {
      browser.url(`${baseUrl}/filter`);
      browser.waitForExist(filterListComponent);

      const defaultFiltersOn = DEFAULT_FILTER_LIST.filter(filter => filter.on);
      const togglesOn = "input:checked";
      const numberTogglesOn = browser.elements(togglesOn).value.length;

      expect(numberTogglesOn).toBe(defaultFiltersOn.length);
    });

    it("returns to the landing page when 'x' is clicked", function () {
      browser.url(`${baseUrl}/filter`);
      browser.waitForExist(filterListComponent);
      browser.click(filterCloseLink);

      expect(browser.waitForExist(navbarComponent)).toBe(true);
    });

    it("returns more results when more filters clicked - NOTE may fail based on location", function () {
      browser.url(`${baseUrl}/filter`);
      browser.waitForExist(filterListComponent);

      const filterToggleUnchecked = "div.react-toggle:not(.react-toggle--checked)";
      const filterTogglesUnchecked = browser.elements(filterToggleUnchecked).value;
      console.log("unchecked toggles:", filterTogglesUnchecked);
      filterTogglesUnchecked.forEach(el => el.click());

      browser.click(filterCloseLink);
      browser.waitForExist(locationsMapComponent);

      const markerArray = browser.elements(markerComponent).value;
      expect(markerArray.length).toBeGreaterThan(10);
    });
  });

  describe("Sidebar / sign-in Page", function () {
    const homeLinkComponent = "a=Home";

    it("displays the sidebar when hamburger clicked", function () {
      browser.url(baseUrl);
      browser.waitForExist(hamburger);
      browser.click(hamburger);

      expect(browser.waitForExist(sidebarComponent)).toBe(true);
    });

    it("goes back to landing page when home link clicked", function () {
      browser.url(`${baseUrl}/sidebar`);
      browser.waitForExist(homeLinkComponent);
      browser.click(homeLinkComponent);

      expect(browser.waitForExist(navbarComponent)).toBe(true);
    });
  });
});
