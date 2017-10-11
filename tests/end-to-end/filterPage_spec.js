// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* global browser */

import { elements as els, baseUrl } from "./elements";
import DEFAULT_FILTER_LIST from "../../imports/state/data/defaultFilters";

describe("Filter Page", function () {
  it("displays the filter page when filter link clicked", function () {
    browser.url(baseUrl);
    browser.waitForExist(els.homePage.filterLink);
    browser.click(els.homePage.filterLink);

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

    expect(browser.waitForExist(els.homePage.navbar)).toBe(true);
  });

  it("returns more results when more filters clicked - NOTE may fail based on location", function () {
    // go to the filter page
    browser.url(els.filterPage.url);
    browser.waitForExist(els.filterPage.component);

    // get all the unchecked filter toggle elements, and click them
    const filterTogglesUnchecked = browser.elements(els.filterPage.toggleUnchecked).value;
    filterTogglesUnchecked[0].click();
    filterTogglesUnchecked[1].click();
    filterTogglesUnchecked[2].click();
    filterTogglesUnchecked[3].click();
    filterTogglesUnchecked[4].click();

    // go to the map (landing page)
    browser.click(els.filterPage.closeLink);
    browser.waitForExist(els.markerComponent, 7000); // allow for some api response time

    // check that there are many more results
    const markerArray = browser.elements(els.markerComponent).value;
    expect(markerArray.length).toBeGreaterThan(10);
  });
});
