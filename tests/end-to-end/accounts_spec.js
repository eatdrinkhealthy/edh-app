// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* global browser server */

import { elements as els, baseUrl } from "./elements";

describe("User Accounts", function () {
  const testUser = {
    username: "testuser",
    email: "testuser@test.com",
    password: "asdfadf",
  };

  describe("Join - create new user", function () {
    beforeAll(() => {
      // a user shouldn't be logged in at this point, but in the event
      // tests were run in an order that logged a user in
      browser.url(baseUrl);
      browser.waitForExist(els.homePage.navbar, 3000); // make sure Meteor is loaded.
      browser.execute("Meteor.logout()");

      // in the event this test suite is run more than once (watch mode), remove
      // the test user, so create / join will succeed
      server.apply("removeUser", [testUser.username]);
    });

    it("should navigate to the join dialog and create a new user", function () {
      // navbar already should be displayed (beforeAll)
      browser.click(els.userMenu.joinLink);

      browser.waitForExist(els.createAccountForm.usernameInput);
      browser.setValue(els.createAccountForm.usernameInput, testUser.username);
      browser.setValue(els.createAccountForm.emailInput, testUser.email);
      browser.setValue(els.createAccountForm.passwordInput, testUser.password);
      browser.setValue(els.createAccountForm.confirmPasswordInput, testUser.password);

      browser.click(els.createAccountForm.submitButton);
    });

    it("should display 'Welcome new user!' AlertMessage", function () {
      browser.waitForExist(els.alertMessage, 2000);
      expect(browser.getHTML(els.alertMessage)).toContain(`Welcome ${testUser.username}!`);
    });

    it("should redirect to the landing / map page", function () {
      browser.waitForExist(els.homePage.navbar);
    });

    it("should logout the user when logout link clicked (show join button)", function () {
      browser.click(els.userMenu.logoutLink);
      expect(browser.waitForExist(els.userMenu.joinLink, 1000)).toBe(true);
    });
  });

  describe("Login / Logout existing user", function () {
    beforeAll(() => {
      // a user shouldn't be logged in at this point, but in the event
      // tests were run in an order that logged a user in
      browser.url(baseUrl);
      browser.waitForExist(els.homePage.navbar, 3000); // make sure Meteor is loaded.
    });

    it("should navigate to the sign in dialog and sign in", function () {
      // navbar already should be displayed (beforeAll)
      browser.click(els.userMenu.loginLink);

      browser.waitForExist(els.loginForm.usernameEmailInput);
      browser.setValue(els.loginForm.usernameEmailInput, testUser.username);
      browser.setValue(els.loginForm.passwordInput, testUser.password);

      browser.click(els.loginForm.submitButton);
    });

    it("should redirect to the landing / map page", function () {
      browser.waitForExist(els.homePage.navbar, 1500);
    });

    it("should show the logged in username on the navbar", function () {
      browser.waitForExist(els.userMenu.username);
      const loggedInUsername = browser.getText(els.userMenu.username);

      expect(loggedInUsername).toEqual(testUser.username);
    });

    it("should logout the user when logout link clicked (show join button)", function () {
      browser.click(els.userMenu.logoutLink);
      expect(browser.waitForExist(els.userMenu.joinLink, 1000)).toBe(true);

      const doesNotExist = browser.waitForExist(els.userMenu.username, null, true);
      expect(doesNotExist).toBe(true);
    });
  });
});
