/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@kadira/storybook";

import Navbar from "../../Navbar";

storiesOf("Page Sections", module)
  .add("Navbar", () => (
    <Navbar />
  ));
