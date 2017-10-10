// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Map from "../../Map";
import sampleVenues from "../../../../state/stores/tests/sampleVenueData";

/* global Window */

storiesOf("Map", module)
  .add("Map - no markers", (): React$Element<*> => (
    <Map
      googleMapsApiKey={Window.Meteor.settings.public.googleMapsApiKey}
      setSelectedVenueHandler={action("clicked")}
      selectedVenueId={null}
    />
  ))
  .add("Map - multiple markers", (): React$Element<*> => (
    <Map
      googleMapsApiKey={Window.Meteor.settings.public.googleMapsApiKey}
      venues={sampleVenues.slice(3)}
      setSelectedVenueHandler={action("clicked")}
      selectedVenueId={null}
    />
  ));