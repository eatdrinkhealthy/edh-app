// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserMenu extends Component {
  props: {
    username?: string,
  };

  static defaultProps = {
    username: "",
  };

  renderLoggedOut(): React$Element<*> {  // eslint-disable-line class-methods-use-this
    return (
      <Link
        id="navbarJoinLink"
        className="f6 link dim ma1 ph3 pv2 mb2 dib white bg-purple"
        to="/sidebar"
      >
        Join
      </Link>
    );
  }

  renderLoggedIn = (): React$Element<*> => (
    <span>{this.props.username}</span>
  );

  render() {  // eslint-disable-line flowtype/require-return-type
    return this.props.username ? this.renderLoggedIn() : this.renderLoggedOut();
  }
}

export default UserMenu;
