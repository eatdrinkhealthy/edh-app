// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserMenu extends Component {
  props: {
    username: ?string,
    logout: () => void,
  };

  renderLoggedOut(): React$Element<*> {  // eslint-disable-line class-methods-use-this
    return (
      <span>
        <Link
          id="joinLink"
          className=""
          to={{ pathname: "/sidebar", search: "?action=signup" }}
        >
          JOIN
        </Link>
        <Link
          id="loginLink"
          className=""
          to={{ pathname: "/sidebar", search: "?action=login" }}
        >
          LOG IN
        </Link>
      </span>
    );
  }

  renderLoggedIn = (): React$Element<*> => (
    <span>
      <span id="loggedInUser" className="">{this.props.username}</span>
      <a
        id="logoutLink"
        className=""
        onClick={this.props.logout}
      >
        Logout
      </a>
    </span>
  );

  render() {  // eslint-disable-line flowtype/require-return-type
    return this.props.username ? this.renderLoggedIn() : this.renderLoggedOut();
  }
}

export default UserMenu;
