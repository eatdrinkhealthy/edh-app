// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* global browser server */

import { elements as els, baseUrl } from "./elements";

describe("Join - create new user", function () {
  beforeAll(() => {
    // a user shouldn't be logged in at this point, but in the event
    // tests were run in an order that logged a user in
    browser.url(baseUrl);
    browser.waitForExist(els.navbar.component, 3000); // make sure Meteor is loaded.
    browser.execute("Meteor.logout()");

    // in the event this test suite is run more than once (watch mode), remove
    // the test user, so create / join will succeed
    server.apply("removeUser", ["testuser"]);
  });

  it("should navigate to the join dialog and create a new user", function () {
    browser.url(els.sidebarPage.url);

    browser.waitForExist(els.createAccountForm.usernameInput);
    browser.setValue(els.createAccountForm.usernameInput, "testuser");
    browser.setValue(els.createAccountForm.emailInput, "testuser@test.com");
    browser.setValue(els.createAccountForm.passwordInput, "asdfasdf");
    browser.setValue(els.createAccountForm.confirmPasswordInput, "asdfasdf");

    browser.click(els.createAccountForm.submitButton);
  });

  it("should display 'Welcome new user!' AlertMessage", function () {
    browser.waitForExist(els.alertMessage, 2000);
    expect(browser.getHTML(els.alertMessage)).toContain("Welcome testuser!");
  });

  it("should redirect to the landing / map page", function () {
    browser.waitForExist(els.navbar.component);
  });

  it("should logout the user when logout link clicked (show join button)", function () {
    browser.click(els.userMenu.logoutLink);
    expect(browser.waitForExist(els.userMenu.joinLink)).toBe(true);
  });
});
