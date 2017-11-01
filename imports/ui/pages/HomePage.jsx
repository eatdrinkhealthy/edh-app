// @flow
import React from "react";
import NavbarContainer from "../containers/NavbarContainer";
import MapContainer from "../containers/MapContainer";
import PrimaryFilter from "../components/PrimaryFilter";

const HomePage = () => (
  <div>
    <NavbarContainer />
    <MapContainer />
    <PrimaryFilter />
  </div>
);

export default HomePage;
