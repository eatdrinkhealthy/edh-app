// @flow
import React from "react";
import { Link } from "react-router-dom";
import CreateAccountContainer from "../containers/CreateAccountContainer";

const Sidebar = (): React$Element<*> => (
  <div className="sidebar">
    <Link to="/">Home</Link>
    <h2 className="mh4">Eat Drink Healthy</h2>
    <div className="pitch">
      A platform to find, share, and discuss healthy places to shop and eat.
    </div>
    <div className="get-started">Get Started</div>
    <CreateAccountContainer />
  </div>
);

export default Sidebar;
