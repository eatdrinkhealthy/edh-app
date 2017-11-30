import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import { initGeoLocation } from "../imports/utils/geoLocation";
import App from "../imports/ui/containers/App";

Meteor.startup(() => {
  initGeoLocation();
  render(<App />, document.getElementById("render-target"));
});
