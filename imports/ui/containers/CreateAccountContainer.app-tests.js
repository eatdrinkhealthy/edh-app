// @flow
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

if (Meteor.isClient) {
  describe("CreateAccount", function () {
    describe("client side call of Accounts.createUser", function () {
      it("should not throw with invalid user schema", function () {
        const invalidUser = {
          username: "abcd",   // too short
          email: "test@home.com",
          password: "strongpassword",
        };

        assert.doesNotThrow(function () {
          Accounts.createUser(invalidUser, () => {});
        });
      });
    });
  });
}
