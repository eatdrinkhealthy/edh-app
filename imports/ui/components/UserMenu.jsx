// @flow
import React from "react";
import { Link } from "react-router-dom";

const UserMenu = (): React$Element<*> => (
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

export default UserMenu;
