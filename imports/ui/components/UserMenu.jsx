// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UserMenu extends Component {
  props: {
    username?: ?string,
  };

  static defaultProps = {
    username: null,
  };

  render() {  // eslint-disable-line flowtype/require-return-type
    return (
      <span>
        <span>UserMenu</span>
        <Link
          id="navbarJoinLink"
          className="f6 link dim ma1 ph3 pv2 mb2 dib white bg-purple"
          to="/sidebar"
        >
        Join
        </Link>
      </span>
    );
  }
}

export default UserMenu;
