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
        id="navbarFilterLink"
        className="f6 link dim ma1 ph3 pv2 mb2 white bg-dark-green"
        to="/filter"
      >
        Filter
      </Link>
    </div>
  </div>
);

export default HomePage;
