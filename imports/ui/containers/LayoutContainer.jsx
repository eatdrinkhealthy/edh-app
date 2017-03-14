// @flow
import React from "react";
import { Meteor } from "meteor/meteor";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";

const LayoutContainer = () => (
  <div>
    <Navbar />
    <LocationsMap googleMapsApiKey={Meteor.settings.public.googleMapsApiKey} />
  </div>
);

export default LayoutContainer;
