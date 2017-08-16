// @flow
import React from "react";
import { Link } from "react-router-dom";

const Navbar = (): React$Element<*> => (
  <div className="nav">
    <div className="dt w-100 pa2">
      <div className="dtc v-mid white w-25">Eat Drink Healthy</div>
      <div className="dtc v-mid w-75 tr">
        <Link
          id="navbarJoinLink"
          className="f6 link dim ma1 ph3 pv2 mb2 dib white bg-purple"
          to="/sidebar"
        >
          Join
        </Link>
        <Link
          id="navbarFilterLink"
          className="f6 link dim ma1 ph3 pv2 mb2 dib white bg-dark-green"
          to="/filter"
        >
          Filter
        </Link>
      </div>
    </div>
  </div>
);

export default Navbar;
