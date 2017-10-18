// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserMenu extends Component {
  props: {
    userLoggedIn?: boolean, // eslint-disable-line react/require-default-props
    logout: () => void,
  };

  renderLoggedOut() {  // eslint-disable-line class-methods-use-this
    return (
      <span>
        <Link
          id="joinLink"
          className="btn join_button"
          to={{ pathname: "/sidebar", search: "?action=signup" }}
        >
          JOIN
        </Link>
        <Link
          id="loginLink"
          className="btn log_in_out_button"
          to={{ pathname: "/sidebar", search: "?action=login" }}
        >
          LOG IN
        </Link>
      </span>
    );
  }

  renderLoggedIn = () => (
    <a
      id="logoutLink"
      className="btn log_in_out_button"
      onClick={this.props.logout}
    >
      LOG OUT
    </a>
  );

  render() {
    return this.props.userLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut();
  }
}

export default UserMenu;
