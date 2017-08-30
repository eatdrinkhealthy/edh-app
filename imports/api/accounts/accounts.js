// @flow
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

Meteor.users.deny({
  update(): boolean {
    return true;
  },
});

const UserSchema = {
  _id: {
    type: String,
  },
  username: {
    type: String,
    min: 4,
    max: 30,
    regEx: [/^(?!root)/i, /^(?!admin)/i],
  },
  emails: {
    type: Array,
  },
  "emails.$": {
    type: Object,
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  "emails.$.verified": {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
  services: {
    type: Object,
    blackbox: true,
  },
};

Accounts.validateNewUser((
  user: {},
): boolean => {
  const userSchema = new SimpleSchema(UserSchema);

  // Place validation checks that are schema format related, or
  // useful to client side (UI) validation as well in the schema
  // So the schema, or portions of the schema can be used on the
  // client too.
  userSchema.validate(user);

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
