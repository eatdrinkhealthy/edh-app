// @flow
import React from "react";
import UserMenuContainer from "../containers/UserMenuContainer";

const Navbar = (): React$Element<*> => (
  <div className="nav">
    <div className="dt w-100 pa2">
      <div className="dtc v-mid white w-25">Eat Drink Healthy</div>
      <div className="dtc v-mid w-75 tr">
        <UserMenuContainer />
      </div>
    </div>
  </div>
);

export default Navbar;
