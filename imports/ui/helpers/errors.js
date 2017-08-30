// @flow
import _ from "lodash";

const lookupErrorMessage = (serverError: string): string => {
  // Using server's error codes or reasons on client to determine what message to display,
  // keeps UI strings on client side for easier internationalization
  const accountErrorMessages = [
    {
      error: "validation-error",
      reason: "Username must be at least 4 characters",
      clientMessage: "Username must be at least 4 characters.",
    },
    {
      error: "validation-error",
      reason: "Address must be a valid e-mail address",
      clientMessage: "Email address must be a valid email address format.",
    },
    {
      error: "validation-error",
      reason: "Username failed regular expression validation",
      clientMessage: "Username can not be named 'root' or 'admin'.",
    },
    {
      error: 403,
      reason: "Username already exists.",
      clientMessage: "An account with this username already exists.",
    },
    {
      error: 403,
      reason: "Email already exists.",
      clientMessage: "An account with this email address already exists.",
    },
    {
      error: 403,
      reason: "User not found",
      clientMessage: "The username / email and password do not match.",
    },
    {
      error: 403,
      reason: "Incorrect password",
      clientMessage: "The username / email and password do not match.",
    },
  ];

  const defaultMessage = "Unable to fulfill request at this time. Please try again later.";
  const matchedError = _.find(accountErrorMessages, { reason: serverError });

  return matchedError ? matchedError.clientMessage : defaultMessage;
};

export default lookupErrorMessage;
