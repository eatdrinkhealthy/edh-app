// @flow
import { Meteor } from "meteor/meteor";

Meteor.methods({
  removeUser(username) { // eslint-disable-line meteor/audit-argument-checks
    return Meteor.users.remove({ username });
  },
});
