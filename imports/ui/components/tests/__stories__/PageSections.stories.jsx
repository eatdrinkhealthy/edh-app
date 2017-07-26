// @flow
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";

import Navbar from "../../Navbar";

storiesOf("Page Sections", module)
  .addDecorator(story => (<MemoryRouter>{story()}</MemoryRouter>))
  .add("Navbar", (): React$Element<*> => (
    <Navbar />
  ));
