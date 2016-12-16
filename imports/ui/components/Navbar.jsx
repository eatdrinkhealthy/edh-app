import React from "react";

const Navbar = () => {
  return (
    <div className="nav">
      <div className="toggle-sidebar">
        <div className="burger" />
        <div className="burger" />
        <div className="burger" />
      </div>
      <div className="nav__title">Eat Drink Healthy</div>
      <div className="toggle-filter">Filter</div>
    </div>
  );
};

export default Navbar;
