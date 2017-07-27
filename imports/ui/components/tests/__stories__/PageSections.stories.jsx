// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf } from "@storybook/react";

import Navbar from "../../Navbar";
import CreateAccount from "../../CreateAccount";

storiesOf("Page Sections", module)
  .addDecorator((story: () => React$Element<*>): React$Element<*> => (
    <MemoryRouter>{story()}</MemoryRouter>
  ))
  .add("Navbar", (): React$Element<*> => (
    <Navbar />
  ))
  .add("CreateAccount", (): React$Element<*> => (
    <CreateAccount />
  ));
