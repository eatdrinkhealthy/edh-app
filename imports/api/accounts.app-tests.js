// @flow
/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback */
import { assert } from "meteor/practicalmeteor:chai";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { resetDatabase } from "meteor/xolvio:cleaner";

import type { IMeteorError } from "meteor/meteor";

if (Meteor.isServer) {
  Accounts.removeDefaultRateLimit();
}

if (Meteor.isClient) {
  describe("CreateAccount", function () {
    describe("client side call of Accounts.createUser", function () {
      beforeEach(function () {
        resetDatabase(null);
      });

      it("should not return an error when all user fields match schema",
        function (done: () => void) {
          const validUser = {
            username: "abcd",
            email: "test@home.com",
            password: "1234567",
          };

          Accounts.createUser(validUser, (err: IMeteorError) => {
            assert.isUndefined(err);
            assert.equal(validUser.username, Meteor.user().username);
            done();
          });
        });

      it("should not throw with invalid user schema", function (done: () => void) {
        const invalidUser = {
          username: "abc",   // too short
          email: "test@home.com",
          password: "StrongPassword",
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
            password: "StrongPassword",
          };

          Accounts.createUser(invalidUser, (err: IMeteorError) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Username must be at least 4 characters");
            done();
          });
        });

      it("should return an error when email doesn't match regex",
        function (done: () => void) {
          const invalidUser = {
            username: "abcd",
            email: "test",
            password: "StrongPassword",
          };

          Accounts.createUser(invalidUser, (err: IMeteorError) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Address must be a valid e-mail address");
            done();
          });
        });

      it("should return an error when username matches 'root', case insensitive",
        function (done: () => void) {
          const invalidUser = {
            username: "rOot",
            email: "test@home.com",
            password: "StrongPassword",
          };

          Accounts.createUser(invalidUser, (err: IMeteorError) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Username failed regular expression validation");
            done();
          });
        });

      it("should return an error when username matches 'admin', case insensitive",
        function (done: () => void) {
          const invalidUser = {
            username: "adMin",
            email: "test@home.com",
            password: "StrongPassword",
          };

          Accounts.createUser(invalidUser, (err: IMeteorError) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Username failed regular expression validation");
            done();
          });
        });

      it("should allow passwords with special characters",
        function (done: () => void) {
          const validUser = {
            username: "abcd",
            email: "test@home.com",
            password: "Strong!@#$%^&()\\-+Password",
          };

          Accounts.createUser(validUser, (err: IMeteorError) => {
            assert.isUndefined(err);
            assert.equal(Meteor.user().username, validUser.username);
            Meteor.logout();
            Meteor.loginWithPassword(validUser.username, validUser.password);
            assert.equal(Meteor.user().username, validUser.username);
            done();
          });
        });

      it("should deny creating a user for username AND email that already exists",
        function (done: () => void) {
          const validUser = {
            username: "abcd",
            email: "test@home.com",
            password: "StrongPassword",
          };
          const dupUser = {
            username: "abcd",
            email: "test@home.com",
            password: "StrongPassword",
          };

          Accounts.createUser(validUser, (err: IMeteorError) => {
            assert.isUndefined(err);
            assert.equal(Meteor.user().username, validUser.username);
            Meteor.logout();
          });

          Accounts.createUser(dupUser, (err: IMeteorError) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Username already exists.");
            done();
          });
        });

      it("should deny creating a user for username that already exists",
        function (done: () => void) {
          const validUser = {
            username: "abcd",
            email: "test@home.com",
            password: "StrongPassword",
          };
          const dupUser = {
            username: "abcd",
            email: "test2@home.com",
            password: "StrongPassword",
          };

          Accounts.createUser(validUser, (err: IMeteorError) => {
            assert.isUndefined(err);
            assert.equal(Meteor.user().username, validUser.username);
            Meteor.logout();
          });

          Accounts.createUser(dupUser, (err: IMeteorError) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Username already exists.");
            done();
          });
        });

      it("should deny creating a user for username that already exists, case insensitive",
        function (done: () => void) {
          const validUser = {
            username: "abcd",
            email: "test@home.com",
            password: "StrongPassword",
          };
          const dupUser = {
            username: "aBcd",
            email: "test2@home.com",
            password: "StrongPassword",
          };

          Accounts.createUser(validUser, (err: IMeteorError) => {
            assert.isUndefined(err);
            assert.equal(Meteor.user().username, validUser.username);
            Meteor.logout();
          });

          Accounts.createUser(dupUser, (err: IMeteorError) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Username already exists.");
            done();
          });
        });

      it("should deny creating a user for email that already exists",
        function (done: () => void) {
          const validUser = {
            username: "abcd",
            email: "test@home.com",
            password: "StrongPassword",
          };
          const dupUser = {
            username: "efgh",
            email: "test@home.com",
            password: "StrongPassword",
          };

          Accounts.createUser(validUser, (err: IMeteorError) => {
            assert.isUndefined(err);
            assert.equal(Meteor.user().username, validUser.username);
            Meteor.logout();
          });

          Accounts.createUser(dupUser, (err: IMeteorError) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Email already exists.");
            done();
          });
        });

      it("should deny creating a user for email that already exists, case insensitive",
        function (done: () => void) {
          const validUser = {
            username: "abcd",
            email: "test@home.com",
            password: "StrongPassword",
          };
          const dupUser = {
            username: "efgh",
            email: "teSt@home.com",
            password: "StrongPassword",
          };

          Accounts.createUser(validUser, (err: IMeteorError) => {
            assert.isUndefined(err);
            assert.equal(Meteor.user().username, validUser.username);
            Meteor.logout();
          });

          Accounts.createUser(dupUser, (err: IMeteorError) => {
            assert.isDefined(err);
            assert.equal(err.reason, "Email already exists.");
            done();
          });
        });
    });
  });
}