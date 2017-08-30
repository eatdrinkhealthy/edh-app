// @flow
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.methods({
  removeUser(username) {
    check(username, String);
    return Meteor.users.remove({ username });
  },
});
