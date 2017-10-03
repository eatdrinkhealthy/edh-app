// @flow
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import userSimpleSchema from "./userSchema";

Meteor.users.deny({
  update(): boolean {
    return true;
  },
});

Meteor.users.simpleSchema = userSimpleSchema;

Accounts.validateNewUser((
  user: {},
): boolean => {
  // Place validation checks that are schema format related, or
  // useful to client side (UI) validation as well in the schema
  // So the schema, or portions of the schema can be used on the
  // client too.
  Meteor.users.simpleSchema.validate(user);

  // Place validation checks that are more specific / isolated to
  // the server side as code, in this validation method.
  // if (fail) throw...

  // NOTE: Meteor (at least since 1.5) checks (insensitive) for and
  //       prevents duplicate usernames and emails
  // Tests were written to confirm this, and should fail if this
  // behavior changes in a future version.

  // Return true to allow user creation to proceed
  return true;
});
