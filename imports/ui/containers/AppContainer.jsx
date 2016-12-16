import React, { Component } from "react";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";

export default class AppContainer extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <LocationsMap />
      </div>
    );
  }
}
