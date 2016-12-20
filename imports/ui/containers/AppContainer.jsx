import React, { Component } from "react";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";

class AppContainer extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <LocationsMap />
      </div>
    );
  }
}

export default AppContainer;
