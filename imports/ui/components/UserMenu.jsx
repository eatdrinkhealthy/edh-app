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
      <Link
        id="joinLink"
        className="f6 link dim ma1 ph3 pv2 mb2 dib white bg-purple"
        to="/sidebar"
      >
        Join
      </Link>
    );
  }

  renderLoggedIn = (): React$Element<*> => (
    <span>
      <span id="loggedInUser">{this.props.username}</span>
      <a
        id="logoutLink"
        className="f6 link dim ma1 ph3 pv2 mb2 dib white bg-dark-blue"
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
