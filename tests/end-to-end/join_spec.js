// intentionally NOT flow checking chimp js files
/* eslint-env jasmine */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* global browser */

import { elements as els } from "./elements";

describe("Join - create new user", function () {
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

  });
});
