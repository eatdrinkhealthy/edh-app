// @flow
import SimpleSchema from "simpl-schema";
import lookupErrorMessage from "../../ui/helpers/errors";

const UserFormSchema = {
  username: {
    type: String,
    min: 4,
    max: 30,
    regEx: [/^(?!root)/i, /^(?!admin)/i],
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  password: {
    type: String,
    min: 4,
  },
  confirmPassword: {
    type: String,
    min: 4,
  },
};

const userFormSimpleSchema = new SimpleSchema(UserFormSchema);

const UserSchema = {
  _id: {
    type: String,
  },
  username: UserFormSchema.username,
  emails: {
    type: Array,
  },
  "emails.$": {
    type: Object,
  },
  "emails.$.address": UserFormSchema.email,
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

export const userSimpleSchema = new SimpleSchema(UserSchema);

export const validateUserField = (
  field: string,
  value: string | number | boolean | {},
): string => {
  let validationError = "";
  const obj = {};
  obj[field] = value;

  try {
    userFormSimpleSchema.validate(obj, { keys: [field] });
  } catch (err) {
    validationError = lookupErrorMessage(err);
  }

  return validationError;
};
