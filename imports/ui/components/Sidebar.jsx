// @flow
import React from "react";
import { Link } from "react-router";

const Sidebar = (): React$Element<*> =>
  <div className="sidebar">
    <Link to="/">Home</Link>
    <div className="logo" />
    <div className="pitch">
      A platform to find, share, and discuss healthy places to shop and eat.
    </div>
    <div className="get-started">Get Started</div>
  </div>;

export default Sidebar;
