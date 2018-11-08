// @flow
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import type { RouterHistory } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import LoginForm from "../components/LoginForm";
import lookupErrorMessage from "../helpers/errors";

import type { ILoginFormValues } from "../components/LoginForm";

class LoginContainer extends Component {
  props: {
    routerHistory?: RouterHistory, // eslint-disable-line react/require-default-props
  };

  login = (formValues: ILoginFormValues) => {
    const { usernameEmail, loginPassword } = formValues;

    Meteor.loginWithPassword(usernameEmail, loginPassword, error => {
      if (error) {
        AlertMessage.warning(lookupErrorMessage(error));
      } else {
        AlertMessage.success(`Welcome ${usernameEmail}!`);
        if (this.props.routerHistory) {
          this.props.routerHistory.push("/");
        }
      }
    });
  };

  render() {
    // NOTE: passing submit handler as onSubmit prop, but it is read from handleSubmit prop
    return <LoginForm onSubmit={this.login} />;
  }
}

export default LoginContainer;
