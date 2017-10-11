// @flow
import React from "react";
import UserMenuContainer from "../containers/UserMenuContainer";

const Navbar = (): React$Element<*> => (
  <div id="navbar" className="nav">
    <div className="">
      <div className="nav__title">Eat Drink Healthy</div>
      <div className="">
        <UserMenuContainer />
      </div>
    </div>
  </div>
);

export default Navbar;
