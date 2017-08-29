// @flow
import React, {
  Component,
} from "react";
import { Meteor } from "meteor/meteor";
import type { RouterHistory } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import Login from "../components/Login";

class LoginContainer extends Component {
  props: {
    routerHistory?: RouterHistory, // eslint-disable-line react/require-default-props
  };

  login = (
    usernameEmail: string,
    password: string,
  ) => {
    Meteor.loginWithPassword(
      usernameEmail,
      password,
      (error) => {
        if (error) {
          alert(error.reason);
        } else {
          AlertMessage.success(`Welcome ${usernameEmail}!`);
          if (this.props.routerHistory) {
            this.props.routerHistory.push("/");
          }
        }
      });
  };

  render() {
    return <Login handleSubmit={this.login} />;
  }
}

export default LoginContainer;
