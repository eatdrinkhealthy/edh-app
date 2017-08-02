// @flow
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { resetDatabase } from "meteor/xolvio:cleaner";

if (Meteor.isClient) {
  describe("CreateAccount", function () {
    describe("client side call of Accounts.createUser", function () {
      beforeEach(function () {
        resetDatabase(null);
      });

      it("should not throw with invalid user schema", function (done: () => void) {
        const invalidUser = {
          username: "abc",   // too short
          email: "test@home.com",
          password: "strongpassword",
        };

        assert.doesNotThrow(function () {
          Accounts.createUser(invalidUser, () => {
            done();
          });
        });
      });

      it("should return an error when username too short",
        function (done: () => void) {
          const invalidUser = {
            username: "abc",   // too short
            email: "test@home.com",
            password: "strongpassword",
          };

          Accounts.createUser(invalidUser, (err) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Username must be at least 4 characters");
            done();
          });
        });

      it("should return an error when password too short",
        function (done: () => void) {
          const invalidUser = {
            username: "abcd",
            email: "test@home.com",
            password: "12345",
          };

          Accounts.createUser(invalidUser, (err) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Password must be at least 1 characters");
            done();
          });
        });

      it("should return an error when email doesn't match regex",
        function (done: () => void) {
          const invalidUser = {
            username: "abcd",
            email: "test",
            password: "strongpassword",
          };

          Accounts.createUser(invalidUser, (err) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Email does not match regex!!!");
            done();
          });
        });

      it("should return an error when username matches 'root', case insensitive",
        function (done: () => void) {
          const invalidUser = {
            username: "rOot",
            email: "test@home.com",
            password: "strongpassword",
          };

          Accounts.createUser(invalidUser, (err) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Username does not match regex!!!");
            done();
          });
        });

      it("should return an error when username matches 'admin', case insensitive",
        function (done: () => void) {
          const invalidUser = {
            username: "admiN",   // too short
            email: "test@home.com",
            password: "strongpassword",
          };

          Accounts.createUser(invalidUser, (err) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Username does not match regex!!!");
            done();
          });
        });
    });
  });
}
