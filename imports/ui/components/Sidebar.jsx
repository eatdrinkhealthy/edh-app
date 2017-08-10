// @flow
import React from "react";
import { Link } from "react-router-dom";
import type { RouterHistory } from "react-router-dom";
import CreateAccountContainer from "../containers/CreateAccountContainer";

// eslint-disable-next-line react/require-default-props
const Sidebar = ({ history }: { history?: RouterHistory }): React$Element<*> => (
  <div className="sidebar">
    <Link to="/">Home</Link>
    <h2 className="mh4">Eat Drink Healthy</h2>
    <div className="pitch">
      A platform to find, share, and discuss healthy places to shop and eat.
    </div>
    <div className="get-started">Get Started</div>
    <CreateAccountContainer routerHistory={history} />
  </div>
);

export default Sidebar;
