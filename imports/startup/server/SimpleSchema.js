// @flow
import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";

//
// Set up SimpleSchema to throw a Meteor.Error (or ValidationError)
// instead of a standard JS Error. This provides more detail across
// the ddp wire for methods and Accounts.validateNewUser
//
SimpleSchema.defineValidationErrorTransform((error) => {
  // $FlowFixMe   (getting can't call constructor. not sure why.)
  const ddpError = new Meteor.Error("validation-error");
  ddpError.details = error.details;

  return ddpError;
});
