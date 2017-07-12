// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@storybook/react";

import Navbar from "../../Navbar";

storiesOf("Page Sections", module)
  .add("Navbar", (): React$Element<*> => (
    <Navbar />
  ));
