// @flow
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MapContainer from "../containers/MapContainer";

const HomePage = () => (
  <div>
    <Navbar />
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
    </div>
  </div>
);

export default HomePage;
