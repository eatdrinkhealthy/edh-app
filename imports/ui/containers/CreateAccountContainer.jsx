// @flow
import React from "react";
import { Accounts } from "meteor/accounts-base";
import type { IMeteorError } from "meteor/meteor";
import AlertMessage from "../components/AlertMessage";
import CreateAccount from "../components/CreateAccount";

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
      // Using error.reason here to determine what message to display, keeps
      // internationalization string usage on client side
      // TODO map error.reason potential values to user friendly messages
      const createUserErrorMsg = error.reason;
      AlertMessage.warning(createUserErrorMsg);
    } else {
      AlertMessage.success(`Welcome ${username}!`);
    }
  });
};

const CreateAccountContainer = (): React$Element<*> => (
  <CreateAccount handleSubmit={createUser} />
);

export default CreateAccountContainer;
