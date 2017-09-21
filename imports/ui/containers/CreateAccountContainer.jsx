// @flow
import React, {
  Component,
} from "react";
import { Accounts } from "meteor/accounts-base";
import type { IMeteorError } from "meteor/meteor";
import type { RouterHistory } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import CreateAccount from "../components/CreateAccount";
import type { ICreateAccountFormValues } from "../components/CreateAccount";
import lookupErrorMessage from "../helpers/errors";

class CreateAccountContainer extends Component {
  props: {
    routerHistory?: RouterHistory, // eslint-disable-line react/require-default-props
  };

  createUser = (values: ICreateAccountFormValues) => {
    const { username, email, password } = values;

    Accounts.createUser({
      username,
      email,
      password,
    }, (error: IMeteorError) => {
      if (error) {
        AlertMessage.warning(lookupErrorMessage(error.reason));
      } else {
        AlertMessage.success(`Welcome ${username}!`);
        if (this.props.routerHistory) {
          this.props.routerHistory.push("/");
        }
      }
    });
  };

  render() {
    // NOTE: passing submit handler as onSubmit prop, but it is read from handleSubmit prop
    return <CreateAccount onSubmit={this.createUser} />;
  }
}

export default CreateAccountContainer;
