// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";

import Navbar from "../../Navbar";

storiesOf("Page Sections", module)
  .addDecorator((story: () => React$Element<*>): React$Element<*> => (
    <MemoryRouter>{story()}</MemoryRouter>
  ))
  .add("Navbar", (): React$Element<*> => (
    <Navbar />
  ));
