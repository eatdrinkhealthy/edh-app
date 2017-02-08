import React from "react";
import { Link } from "react-router";

const Navbar = () =>
  <div className="nav">

    <Link to="/sidebar">
      <div className="toggle-sidebar">
        <div className="burger" />
        <div className="burger" />
        <div className="burger" />
      </div>
    </Link>

    <div className="nav__title">Eat Drink Healthy</div>

    <Link to="/filter">
      <div className="toggle-filter">Filter</div>
    </Link>
  </div>;

export default Navbar;
