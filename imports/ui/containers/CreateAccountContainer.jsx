// @flow
import React from "react";
import { Accounts } from "meteor/accounts-base";
import type { IMeteorError } from "meteor/meteor";
import AlertMessage from "../components/AlertMessage";
import CreateAccount from "../components/CreateAccount";
import lookupErrorMessage from "../helpers/errors";

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
