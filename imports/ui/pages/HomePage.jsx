// @flow
import React from "react";
import NavbarContainer from "../containers/NavbarContainer";
import MapContainer from "../containers/MapContainer";
import PrimaryFilterContainer from "../containers/PrimaryFilterContainer";

const HomePage = () => (
  <div>
    <NavbarContainer />
    <MapContainer />
    <PrimaryFilterContainer />
  </div>
);

export default HomePage;
