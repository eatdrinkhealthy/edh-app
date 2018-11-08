// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* global browser server */

import { elements as els, baseUrl } from "./elements";

describe("User Accounts", function() {
  const testUser = {
    username: "testuser",
    email: "testuser@test.com",
    password: "asdfasdf",
  };

  describe("Join - create new user", function() {
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

    it("should navigate to the join dialog and create a new user", function() {
      // navbar already should be displayed (beforeAll)
      browser.click(els.userMenu.joinLink);

      browser.waitForExist(els.createAccountForm.username);
      browser.setValue(els.createAccountForm.username, testUser.username);
      browser.setValue(els.createAccountForm.email, testUser.email);
      browser.setValue(els.createAccountForm.password, testUser.password);
      browser.setValue(els.createAccountForm.confirmPassword, testUser.password);

      browser.click(els.createAccountForm.submitButton);
    });

    it("should display 'Welcome new user!' AlertMessage", function() {
      browser.waitForExist(els.alertMessage, 2000);
      expect(browser.getHTML(els.alertMessage)).toContain(
        `Welcome ${testUser.username}!`,
      );
    });

    it("should redirect to the landing / map page", function() {
      browser.waitForExist(els.homePage.navbar);
    });

    it("should logout the user when logout link clicked (show join button)", function() {
      browser.click(els.userMenu.logoutLink);
      expect(browser.waitForExist(els.userMenu.joinLink, 2000)).toBe(true);
    });
  });

  describe("Login / Logout existing user", function() {
    beforeAll(() => {
      // a user shouldn't be logged in at this point, but in the event
      // tests were run in an order that logged a user in
      browser.url(baseUrl);
      browser.waitForExist(els.homePage.navbar, 3000); // make sure Meteor is loaded.
    });

    it("should navigate to the sign in dialog and sign in", function() {
      // navbar already should be displayed (beforeAll)
      browser.click(els.userMenu.loginLink);

      browser.waitForExist(els.loginForm.usernameEmail);
      browser.setValue(els.loginForm.usernameEmail, testUser.username);
      browser.setValue(els.loginForm.password, testUser.password);

      browser.click(els.loginForm.submitButton);
    });

    it("should redirect to the landing / map page", function() {
      browser.waitForExist(els.homePage.navbar, 1500);
    });

    const getResponsiveLoggedInUser = () => {
      // depending on browser width, could be one or the other fields
      //   -if user not logged in, both should be empty
      const navbarUsernameRow1 = browser.getText(els.navbar.username);
      const navbarUsernameRow2 = browser.getText(els.navbar.username_row2);

      // returns logged in username, or empty if both strings are empty
      return navbarUsernameRow1 || navbarUsernameRow2;
    };

    it("should show the logged in username on the navbar", function() {
      browser.waitForExist(els.homePage.navbar);
      const loggedInUsername = getResponsiveLoggedInUser();

      expect(loggedInUsername).toEqual(`Welcome, ${testUser.username}!`);
    });

    it("should logout the user when logout link clicked (show join button)", function() {
      browser.click(els.userMenu.logoutLink);
      expect(browser.waitForExist(els.userMenu.joinLink, 1000)).toBe(true);

      const loggedInUsername = getResponsiveLoggedInUser();
      expect(loggedInUsername).toBe("");
    });
  });
});
