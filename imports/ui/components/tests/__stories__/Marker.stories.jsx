/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import {
  storiesOf,
} from "@kadira/storybook";
import { text } from "@kadira/storybook-addon-knobs";
import Marker from "../../Marker";

storiesOf("Map", module)
  .add("Marker", () => (<Marker label={text("Label", "")} />));
