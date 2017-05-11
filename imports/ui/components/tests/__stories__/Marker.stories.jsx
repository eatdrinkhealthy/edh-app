// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { storiesOf, action } from "@kadira/storybook";
import { select, boolean } from "@kadira/storybook-addon-knobs";
import CenterWrapper from "../../../../../.storybook/decorators/CenterWrapper";
import Marker from "../../Marker";

const sampleVenue = {
  id: "abc123",
  name: "Verde",
  location: {
    lat: 0,
    lng: 1,
  },
};

storiesOf("Map", module)
  .add("Marker", (): React$Element<*> => (
    <CenterWrapper
      width="50%"
      height="50%"
      childrenBorder={boolean("Children Border", false)}
      hasBorder={boolean("Parent Border", false)}
      background={
        select(
          "Parent Background",
          { transparent: "transparent", lightblue: "lightblue", white: "white" },
          "transparent",
        )
      }
    >
      <Marker
        venue={sampleVenue}
        origin={
          select(
            "Origin",
            { center: "center", topLeft: "topLeft", bottomCenter: "bottomCenter" },
            "bottomCenter",
          )
        }
        selected={boolean("Selected", false)}
        setSelectedVenueHandler={action("clicked")}
      />
    </CenterWrapper>
  ));
