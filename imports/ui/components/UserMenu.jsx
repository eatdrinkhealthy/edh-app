// @flow
/* eslint-disable class-methods-use-this */
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserMenu extends Component {
  props: {
    userLoggedIn?: boolean, // eslint-disable-line react/require-default-props
    logout: () => void,
  };

  renderLoggedOut() {
    return (
      <span>
        <Link
          id="joinLink"
          className="btn solid_button"
          to={{ pathname: "/sidebar", search: "?action=signup" }}
        >
          JOIN
        </Link>
        <Link
          id="loginLink"
          className="btn transparent_button"
          to={{ pathname: "/sidebar", search: "?action=login" }}
        >
          LOG IN
        </Link>
      </span>
    );
  }

  /* eslint-disable jsx-a11y/anchor-is-valid */
  renderLoggedIn = () => (
    <a
      id="logoutLink"
      className="btn transparent_button"
      onClick={this.props.logout}
      href=""
    >
      LOG OUT
    </a>
  );
  /* eslint-enable jsx-a11y/anchor-is-valid */

  render() {
    return this.props.userLoggedIn ? this.renderLoggedIn() : this.renderLoggedOut();
  }
}

export default UserMenu;
