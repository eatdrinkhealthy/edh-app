// @flow
import { Accounts } from "meteor/accounts-base";
import { SimpleSchema } from "meteor/aldeed:simple-schema";

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

  userSchema.validate(user);

  // Return true to allow user creation to proceed
  return true;
});
