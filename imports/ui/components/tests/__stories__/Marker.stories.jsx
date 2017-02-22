/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import {
  storiesOf,
} from "@kadira/storybook";
import Marker from "../../Marker";

storiesOf("Map", module)
  .add("Marker", () => (<Marker />));
