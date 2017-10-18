// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf, action } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";

import Login from "../../Login";
import UserMenu from "../../UserMenu";
import Navbar from "../../Navbar";

storiesOf("Page Sections", module)
  .addDecorator((story: () => React$Element<*>): React$Element<*> => (
    <MemoryRouter>{story()}</MemoryRouter>
  ))
  .add("Login", (): React$Element<*> => (
    <Login handleSubmit={action("submitted")} />
  ))
  .add("UserMenu", (): React$Element<*> => (
    <UserMenu
      userLoggedIn={boolean("userLoggedIn", false)}
      logout={action("logout clicked")}
    />
  ))
  .add("Navbar", () => (
    <Navbar
      username={text("username", "testUser")}
      userLoggedIn={boolean("userLoggedIn", true)}
      logout={action("logout clicked")}
    />
  ));
