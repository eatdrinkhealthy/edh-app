// @flow
import React from "react";
import { Link } from "react-router-dom";
import NavbarContainer from "../containers/NavbarContainer";
import MapContainer from "../containers/MapContainer";
import PrimaryFilter from "../components/PrimaryFilter";

const HomePage = () => (
  <div>
    <NavbarContainer />
    <MapContainer />
    <div>
      <Link
        id="filterLink"
        className="btn btn-default"
        to="/filter"
        role="button"
      >
        Filter
      </Link>
      <PrimaryFilter />
    </div>
  </div>
);

export default HomePage;
