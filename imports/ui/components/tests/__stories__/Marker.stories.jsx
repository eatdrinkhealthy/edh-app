// @flow

/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import {
  storiesOf,
} from "@kadira/storybook";
import { select, boolean } from "@kadira/storybook-addon-knobs";
import CenterWrapper from "../../../../../.storybook/decorators/CenterWrapper";
import Marker from "../../Marker";

storiesOf("Map", module)
  .add("Marker", (): React$Element<*> => (
    <CenterWrapper
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
        venueId={"abc"}
        origin={
          select("Origin", { center: "center", topLeft: "topLeft", bottomCenter: "bottomCenter" }, "center")
        }
      />
    </CenterWrapper>
  ));
