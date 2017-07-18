// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

const baseUrl = "http://localhost:3000";

describe("Smoke Test", function () {
  const map = ".map-container";
  const navbar = ".nav__title";
  const hamburger = ".toggle-sidebar";
  const pitch = ".pitch";
  const homeAnchor = "a[href='/']";

  describe("Landing Page", function () {
    it("displays the map and navbar as the main page", function () {
      browser.url(baseUrl);
      expect(browser.getTitle()).toEqual("Eat Drink Healthy");
      expect(browser.waitForExist(map)).toBe(true);
      expect(browser.waitForExist(navbar)).toBe(true);
    });
  });

  describe("Sign-in Page", function () {
    it("displays the sign-in page when hamburger clicked", function () {
      browser.url(baseUrl);
      browser.waitForExist(hamburger);
      browser.click(hamburger);
      expect(browser.waitForExist(pitch)).toBe(true);
    });

    it("goes back to landing (home) page when home link clicked", function () {
      browser.url(`${baseUrl}/sidebar`);
      browser.waitForExist(homeAnchor);
      browser.click(homeAnchor);
      expect(browser.waitForExist(navbar)).toBe(true);
    });
  });
});
