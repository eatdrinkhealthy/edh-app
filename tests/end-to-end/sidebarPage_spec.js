// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import { elements as els, baseUrl } from "./elements";

describe("Sidebar / sign-in Page", function () {
  it("displays the sidebar when join link clicked", function () {
    browser.url(baseUrl);
    browser.waitForExist(els.homePage.navbar);
    // WARNING
    //   -when searching for an element two times in a row, that is
    //   wrapped in a createContainer, the second search may fail.
    //   e.g. waitForExist(someButton), then click(someButton) may
    //   result in an 'element not found on page' error
    browser.click(els.userMenu.joinLink);

    expect(browser.waitForExist(els.sidebarPage.component)).toBe(true);
  });

  it("goes back to landing page when home link clicked", function () {
    browser.waitForExist(els.sidebarPage.homeLink);
    browser.click(els.sidebarPage.homeLink);

    expect(browser.waitForExist(els.homePage.navbar)).toBe(true);
  });
});
