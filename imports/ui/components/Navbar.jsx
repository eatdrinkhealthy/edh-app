// @flow
import React from "react";
import UserMenuContainer from "../containers/UserMenuContainer";

const Navbar = (): React$Element<*> => (
  <div id="navbar" className="nav">
    <img
      className="nav__logo verticalCenterFudge"
      src="/images/EDH-logo.png"
      alt="Eat Drink Healthy logo"
    />
    <span className="nav__title">EAT.&nbsp;DRINK.&nbsp;HEALTHY.</span>
    <span className="nav__usermenu"><UserMenuContainer /></span>
  </div>
);

export default Navbar;
