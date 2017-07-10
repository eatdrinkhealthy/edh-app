// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import LocationsMap from "../../LocationsMap";
import sampleVenues from "../../../../data/state/stores/tests/sampleVenueData";

/* global Window */

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
      venues={sampleVenues.slice(3)}
      setSelectedVenueHandler={action("clicked")}
      selectedVenueId={null}
    />
  ));
