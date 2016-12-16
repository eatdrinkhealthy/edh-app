import React, { Component } from "react";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default class AppContainer extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <LocationsMap />
        <Sidebar />
      </div>
    );
  }
}
