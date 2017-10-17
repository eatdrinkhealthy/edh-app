// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserMenu extends Component {
  props: {
    username: ?string,
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
    <span>
      <span id="loggedInUser" className="username">Welcome, {this.props.username}!</span>
      <a
        id="logoutLink"
        className="btn log_in_out_button"
        onClick={this.props.logout}
      >
        LOG OUT
      </a>
    </span>
  );

  render() {
    return this.props.username ? this.renderLoggedIn() : this.renderLoggedOut();
  }
}

export default UserMenu;
