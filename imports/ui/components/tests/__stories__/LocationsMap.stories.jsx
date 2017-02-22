/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@kadira/storybook";
import LocationsMap from "../../LocationsMap";
import Marker from "../../Marker";

/* global Window */

storiesOf("Map", module)
  .add("LocationsMap - no markers", () => (
    <LocationsMap googleMapsApiKey={Window.Meteor.settings.public.googleMapsApiKey} />
  ))
  .add("LocationsMap - one center marker", () => (
    <LocationsMap googleMapsApiKey={Window.Meteor.settings.public.googleMapsApiKey} >
      <Marker
        lat={32.789008}
        lng={-79.932115}
      />
    </LocationsMap>
  ));
