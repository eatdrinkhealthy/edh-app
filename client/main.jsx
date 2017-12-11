import { Meteor } from "meteor/meteor";
import React from "react";
import { render } from "react-dom";
import { initGeolocation } from "../imports/utils/geoLocation";
import App from "../imports/ui/containers/App";

Meteor.startup(() => {
  initGeolocation();
  render(<App />, document.getElementById("render-target"));
});
