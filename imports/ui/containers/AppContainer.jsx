import React from "react";
import { Meteor } from "meteor/meteor";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";

const AppContainer = () => (
  <div>
    <Navbar />
    <LocationsMap googleMapsApiKey={Meteor.settings.public.googleMapsApiKey} />
  </div>
);

export default AppContainer;
