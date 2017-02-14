import React from "react";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";
import { Meteor } from "meteor/meteor";

const AppContainer = () => (
  <div>
    <Navbar />
    <LocationsMap googleMapsApiKey={Meteor.settings.public.googleMapsApiKey} />
  </div>
);

export default AppContainer;
