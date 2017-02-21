/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@kadira/storybook";
import LocationsMap from "../../LocationsMap";

/* global Window */

storiesOf("Map", module)
  .add("LocationsMap", () => (
    <LocationsMap googleMapsApiKey={Window.Meteor.settings.public.googleMapsApiKey} />
  ));
