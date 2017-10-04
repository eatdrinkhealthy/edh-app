// @flow
import SimpleSchema from "simpl-schema";

export const UserSchema = {
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

const userSimpleSchema = new SimpleSchema(UserSchema);

export const validateUserField = (
  field: string,
  value: string | number | boolean | {},
): string => {
  let validationError = "";
  const obj = {};
  obj[field] = value;

  const fieldValidation = userSimpleSchema.newContext();
  if (!fieldValidation.validate(obj, { keys: [field] })) {
    validationError = fieldValidation.keyErrorMessage(field);
  }

  return validationError;
};


export default userSimpleSchema;
