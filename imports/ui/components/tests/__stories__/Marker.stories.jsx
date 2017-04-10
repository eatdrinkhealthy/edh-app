// @flow

/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import {
  storiesOf,
} from "@kadira/storybook";
import { text, select } from "@kadira/storybook-addon-knobs";
import Marker from "../../Marker";

storiesOf("Map", module)
  .add("Marker", (): React$Element<*> => (
    <Marker
      label={text("Label", "")}
      origin={
        select("Origin", { center: "center", topLeft: "topLeft", bottomCenter: "bottomCenter" }, "center")
      }
    />
  ));
