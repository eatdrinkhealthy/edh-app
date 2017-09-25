// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf, action } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import Login from "../../Login";
import UserMenu from "../../UserMenu";

storiesOf("Page Sections", module)
  .addDecorator((story: () => React$Element<*>): React$Element<*> => (
    <MemoryRouter>{story()}</MemoryRouter>
  ))
  .add("Login", (): React$Element<*> => (
    <Login handleSubmit={action("submitted")} />
  ))
  .add("UserMenu", (): React$Element<*> => (
    <UserMenu
      username={text("username", "")}
      logout={action("clicked")}
    />
  ));
