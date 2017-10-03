// @flow
import _ from "lodash";

const lookupErrorMessage = (error: {}): string => {
  // Using server's error codes or reasons on client to determine what message to display,
  // keeps UI strings on client side for easier internationalization
  const accountErrorMessages = [
    {
      errorCode: "Username is required",
      clientMessage: "Username is a required field.",
    },
    {
      errorCode: "Username must be at least 4 characters",
      clientMessage: "Username must be at least 4 characters.",
    },
    {
      errorCode: "Emails is required",
      clientMessage: "Email address is a required field.",
    },
    {
      errorCode: "Address must be a valid e-mail address",
      clientMessage: "Email address must be a valid email address format.",
    },
    {
      errorCode: "Username failed regular expression validation",
      clientMessage: "Username can not be named 'root' or 'admin'.",
    },
    {
      errorCode: "Username already exists.",
      clientMessage: "An account with this username already exists.",
    },
    {
      errorCode: "Email already exists.",
      clientMessage: "An account with this email address already exists.",
    },
    {
      errorCode: "User not found",
      clientMessage: "The username / email and password do not match.",
    },
    {
      errorCode: "Incorrect password",
      clientMessage: "The username / email and password do not match.",
    },
  ];

  let errorCode;

  // determine error type (ValidationError or not [Meteor.Error , JS Error])
  if (error.error === "validation-error" && error.details && Array.isArray(error.details)) {
    // $FlowFixMe
    errorCode = error.details[0].message || "unknown code";
  } else {
    errorCode = error.reason || "unknown code";
  }

  const defaultMessage = "Unable to fulfill request at this time. Please try again later.";
  const matchedError = _.find(accountErrorMessages, { errorCode });

  return matchedError ? matchedError.clientMessage : defaultMessage;
};

export default lookupErrorMessage;
