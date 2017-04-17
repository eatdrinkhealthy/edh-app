// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf, action } from "@kadira/storybook";
import LocationsMap from "../../LocationsMap";

/* global Window */

const sampleVenues = [
  { id: "A", name: "testVenueA", location: { lat: 32.789008, lng: -79.932115 } },
  { id: "B", name: "testVenueB", location: { lat: 32.789659, lng: -79.935796 } },
  { id: "C", name: "testVenueC", location: { lat: 32.785699, lng: -79.935796 } },
];

storiesOf("Map", module)
  .add("LocationsMap - no markers", (): React$Element<*> => (
    <LocationsMap
      googleMapsApiKey={Window.Meteor.settings.public.googleMapsApiKey}
      setSelectedVenueHandler={action("clicked")}
      selectedVenueId={null}
    />
  ))
  .add("LocationsMap - multiple markers", (): React$Element<*> => (
    <LocationsMap
      googleMapsApiKey={Window.Meteor.settings.public.googleMapsApiKey}
      venues={sampleVenues}
      setSelectedVenueHandler={action("clicked")}
      selectedVenueId={null}
    />
  ));
