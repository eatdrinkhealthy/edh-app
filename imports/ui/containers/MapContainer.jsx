// @flow
import React from "react";
import { Meteor } from "meteor/meteor";
import LocationsMap from "../components/LocationsMap";
import Navbar from "../components/Navbar";

const MapContainer = (): React$Element<*> => (
  <div>
    <Navbar />
    <LocationsMap googleMapsApiKey={Meteor.settings.public.googleMapsApiKey} />
  </div>
);

export default MapContainer;
