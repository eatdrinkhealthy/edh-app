import React, { Component } from "react";
import LocationsMap from "../components/LocationsMap";

export default class AppContainer extends Component {
  render() {
    return (
      <div className="container">
        <h1>Here we go!</h1>
        <LocationsMap />
      </div>
    );
  }
}
