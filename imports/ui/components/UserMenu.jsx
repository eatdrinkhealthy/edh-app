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
          className="dib f5 link dim ma1 mb2 ph3 pv2 ba bw2 br3 white bg-purple b--purple"
          to={{ pathname: "/sidebar", search: "?action=signup" }}
        >
          JOIN
        </Link>
        <Link
          id="loginLink"
          className="dib f5 link dim ma1 mb2 ph3 pv2 ba bw2 br3 b--purple"
          to={{ pathname: "/sidebar", search: "?action=login" }}
        >
          LOG IN
        </Link>
      </span>
    );
  }

  renderLoggedIn = (): React$Element<*> => (
    <span>
      <span id="loggedInUser" className="f5">{this.props.username}</span>
      <a
        id="logoutLink"
        className="dib f5 link dim ma1 mb2 ph3 pv2 ba bw2 br3 white bg-purple b--purple"
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
