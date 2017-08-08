// @flow
import React from "react";
import { Accounts } from "meteor/accounts-base";
import type { IMeteorError } from "meteor/meteor";
import _ from "lodash";
import AlertMessage from "../components/AlertMessage";
import CreateAccount from "../components/CreateAccount";

export const lookupErrorMessage = (serverError: string): string => {
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
  ];

  const defaultMessage = "Unable to create a new account at this time. Please try again later.";
  const matchedError = _.find(accountErrorMessages, { reason: serverError });

  return matchedError ? matchedError.clientMessage : defaultMessage;
};

export const createUser = (
  username: string,
  email: string,
  password: string,
) => {
  Accounts.createUser({
    username,
    email,
    password,
  }, (error: IMeteorError) => {
    if (error) {
      // Using server's error.reason on client to determine what message to display, keeps
      // internationalization string usage on client side
      AlertMessage.warning(lookupErrorMessage(error.reason));
    } else {
      AlertMessage.success(`Welcome ${username}!`);
    }
  });
};

const CreateAccountContainer = (): React$Element<*> => (
  <CreateAccount handleSubmit={createUser} />
);

export default CreateAccountContainer;
