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
  describe("Accounts", function () {
    function waitForLogout() {
      it("wait for Meteor.logout()", function (done: () => void) {
        Meteor.logout((err) => {  // eslint-disable-line flowtype/require-parameter-type
          assert.isUndefined(err);
          assert.equal(Meteor.user(), null);
          done();
        });
      });
    }

    function waitForResetDatabase() {
      it("wait for resetDatabase()", function (done: () => void) {
        resetDatabase(null, () => done());
      });
    }

    describe("CreateAccount", function () {
      //
      // NOTE: most of these tests need to be done in a specific order, relying
      //       accounts to be created in one test, checked in another, or for
      //       a logout to complete (logout is asynchronous)
      //
      // When tests successfully create a user, that user is logged in. A subsequent
      // test may need the user to be logged out (depends on the test).
      //
      // Likewise, the database does not need to be reset between each test,
      // as some tests rely on a created user to exist.
      //

      describe("client side call of Accounts.createUser", function () {
        describe("user schema validation", function () {
          waitForResetDatabase();

          it("should NOT return an error when all user fields match schema",
            function (done: () => void) {
              const validUser = {
                username: "abcd",
                email: "abcd@test.com",
                password: "1234567",
              };

              Accounts.createUser(validUser, (err: IMeteorError) => {
                const user = Meteor.user();
                const username = user && user.username;

                assert.isUndefined(err);
                assert.equal(validUser.username, username);
                done();
              });
            });

          waitForLogout();
          waitForResetDatabase();

          it("should NOT throw with invalid user schema", function (done: () => void) {
            const invalidUser = {
              username: "abc",   // too short
              email: "abc@test.com",
              password: "StrongPassword",
            };

            assert.doesNotThrow(function () {
              Accounts.createUser(invalidUser, () => {
                done();
              });
            });
          });

          it("should return an error when username too short", function (done: () => void) {
            const invalidUser = {
              username: "abc",   // too short
              email: "abc@test.com",
              password: "StrongPassword",
            };

            Accounts.createUser(invalidUser, (err: IMeteorError) => {
              assert.isDefined(err);
              assert.equal(err.error, "validation-error");
              assert.equal(err.reason, "Username must be at least 4 characters");
              done();
            });
          });

          it("should return an error when username not provided",
            function (done: () => void) {
              const invalidUser = {
                username: "",   // too short
                email: "abc@test.com",
                password: "StrongPassword",
              };

              Accounts.createUser(invalidUser, (err: IMeteorError) => {
                assert.isDefined(err);
                assert.equal(err.error, "validation-error");
                assert.equal(err.reason, "Username is required");
                done();
              });
            });

          it("should return an error when email not provided",
            function (done: () => void) {
              const invalidUser = {
                username: "abcd",
                email: "",
                password: "StrongPassword",
              };

              Accounts.createUser(invalidUser, (err: IMeteorError) => {
                assert.isDefined(err);
                assert.equal(err.error, "validation-error");
                assert.equal(err.reason, "Emails is required");
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
                assert.equal(err.error, "validation-error");
                assert.equal(err.reason, "Address must be a valid e-mail address");
                done();
              });
            });

          it("should return an error when username matches 'root', case insensitive",
            function (done: () => void) {
              const invalidUser = {
                username: "rOot",
                email: "rOot@test.com",
                password: "StrongPassword",
              };

              Accounts.createUser(invalidUser, (err: IMeteorError) => {
                assert.isDefined(err);
                assert.equal(err.error, "validation-error");
                assert.equal(err.reason, "Username failed regular expression validation");
                done();
              });
            });

          it("should return an error when username matches 'admin', case insensitive",
            function (done: () => void) {
              const invalidUser = {
                username: "adMin",
                email: "adMin@test.com",
                password: "StrongPassword",
              };

              Accounts.createUser(invalidUser, (err: IMeteorError) => {
                assert.isDefined(err);
                assert.equal(err.error, "validation-error");
                assert.equal(err.reason, "Username failed regular expression validation");
                done();
              });
            });
        });

        describe("special characters in password", function () {
          waitForLogout();
          waitForResetDatabase();

          const userWithStrangePw = {
            username: "abcd",
            email: "abcd@test.com",
            password: "Strong!@#$%^&()\\-+Password",
          };

          it("should create user with password that has special characters",
            function (done: () => void) {
              Accounts.createUser(userWithStrangePw, (err: IMeteorError) => {
                const user = Meteor.user();
                const username = user && user.username;

                assert.isUndefined(err);
                assert.equal(username, userWithStrangePw.username);
                done();
              });
            });

          waitForLogout();

          it("should allow login with a password that has special characters",
            function (done: () => void) {
              Meteor.loginWithPassword(userWithStrangePw.username, userWithStrangePw.password,
                function () {
                  const user = Meteor.user();
                  const username = user && user.username;

                  assert.equal(username, userWithStrangePw.username);
                  done();
                });
            });
        });

        describe("duplicate user prevention", function () {
          waitForLogout();
          waitForResetDatabase();

          const originalUser = {
            username: "orig",
            email: "orig@test.com",
            password: "StrongPassword",
          };

          it("should create a user to be used for comparing duplicates",
            function (done: () => void) {
              Accounts.createUser(originalUser, (err: IMeteorError) => {
                const user = Meteor.user();
                const username = user && user.username;

                assert.isUndefined(err);
                assert.equal(username, originalUser.username);
                done();
              });
            });

          waitForLogout();

          it("should deny creating a user, where a user with same a username AND email already exist",
            function (done: () => void) {
              const dupUser = {
                username: "orig",
                email: "orig@test.com",
                password: "StrongPassword",
              };

              Accounts.createUser(dupUser, (err: IMeteorError) => {
                assert.isDefined(err);
                assert.equal(err.error, 403);
                assert.equal(err.reason, "Username already exists.");
                done();
              });
            });

          it("should deny creating a user with username that already exists",
            function (done: () => void) {
              const dupUser = {
                username: "orig",
                email: "different@test.com",
                password: "StrongPassword",
              };

              Accounts.createUser(dupUser, (err: IMeteorError) => {
                assert.isDefined(err);
                assert.equal(err.error, 403);
                assert.equal(err.reason, "Username already exists.");
                done();
              });
            });

          it("should deny creating a user with email that already exists",
            function (done: () => void) {
              const dupUser = {
                username: "different",
                email: "orig@test.com",
                password: "StrongPassword",
              };

              Accounts.createUser(dupUser, (err: IMeteorError) => {
                assert.isDefined(err);
                assert.equal(err.error, 403);
                assert.equal(err.reason, "Email already exists.");
                done();
              });
            });

          // I wrote these tests expecting them to fail, but then learned Meteor
          // does support rejecting case insensitive matches out of the box.
          it("should deny creating a user for username that already exists, case insensitive",
            function (done: () => void) {
              const dupUser = {
                username: "oRig",
                email: "different@test.com",
                password: "StrongPassword",
              };

              Accounts.createUser(dupUser, (err: IMeteorError) => {
                assert.isDefined(err);
                assert.equal(err.error, 403);
                assert.equal(err.reason, "Username already exists.");
                done();
              });
            });

          it("should deny creating a user with email that already exists, case insensitive",
            function (done: () => void) {
              const dupUser = {
                username: "different",
                email: "orIg@test.com",
                password: "StrongPassword",
              };

              Accounts.createUser(dupUser, (err: IMeteorError) => {
                assert.isDefined(err);
                assert.equal(err.error, 403);
                assert.equal(err.reason, "Email already exists.");
                done();
              });
            });
        });

        describe("deny writes to user document", function () {
          waitForLogout();
          waitForResetDatabase();

          const testUser = {
            username: "orig",
            email: "orig@test.com",
            password: "StrongPassword",
          };

          it("should create a user for deny write testing",
            function (done: () => void) {
              Accounts.createUser(testUser, (err: IMeteorError) => {
                const user = Meteor.user();
                const username = user && user.username;

                assert.isUndefined(err);
                assert.equal(username, testUser.username);
                done();
              });
            });

          it("should deny adding any data to user document", function (done: () => void) {
            Meteor.users.update(Meteor.userId(),
              {
                $set: {
                  "profile.favoriteSport": "Soccer",
                },
              },
              (err, numDocsUpdated) => { // eslint-disable-line flowtype/require-parameter-type
                assert.isDefined(err);
                assert.equal(numDocsUpdated, false);
                done();
              },
            );
          });
        });
      });
    });

    describe("Login", function () {
      waitForLogout();
      waitForResetDatabase();

      const testUser = {
        username: "orig",
        email: "orig@test.com",
        password: "StrongPassword",
      };

      //
      // For the most part, testing (learning) what the server responses are for
      // failed login attempts.
      //

      it("should create a user for login testing", function (done) {
        Accounts.createUser(testUser, (err) => {
          const user = Meteor.user();
          const username = user && user.username;

          assert.isUndefined(err);
          assert.equal(username, testUser.username);
          done();
        });
      });

      waitForLogout();

      it("should receive 'User not found' error with bad username", function (done) {
        Meteor.loginWithPassword("otherUser", "StrongPassword", (err) => {
          assert.isDefined(err);
          // $FlowFixMe     (err is defined)
          assert.equal(err.error, 403);
          // $FlowFixMe     (err is defined)
          assert.equal(err.reason, "User not found");
          done();
        });
      });

      it("should receive 'User not found' error with bad email", function (done) {
        Meteor.loginWithPassword("otherUser@test.com", "StrongPassword", (err) => {
          assert.isDefined(err);
          // $FlowFixMe     (err is defined)
          assert.equal(err.error, 403);
          // $FlowFixMe     (err is defined)
          assert.equal(err.reason, "User not found");
          done();
        });
      });

      it("should receive 'Incorrect password' error with bad password", function (done) {
        Meteor.loginWithPassword("orig", "BadPassword", (err) => {
          assert.isDefined(err);
          // $FlowFixMe     (err is defined)
          assert.equal(err.error, 403);
          // $FlowFixMe     (err is defined)
          assert.equal(err.reason, "Incorrect password");
          done();
        });
      });
    });
  });
}
