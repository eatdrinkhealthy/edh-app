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
    <div className="toggle-filter">Filter</div>
  </div>;

export default Navbar;
