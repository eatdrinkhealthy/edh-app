// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf, action } from "@storybook/react";
import { text } from "@storybook/addon-knobs";

import CreateAccount from "../../CreateAccount";
import UserMenu from "../../UserMenu";

storiesOf("Page Sections", module)
  .addDecorator((story: () => React$Element<*>): React$Element<*> => (
    <MemoryRouter>{story()}</MemoryRouter>
  ))
  .add("CreateAccount", (): React$Element<*> => (
    <CreateAccount handleSubmit={action("submitted")} />
  ))
  .add("UserMenu", (): React$Element<*> => (
    <UserMenu
      username={text("username", "")}
      logout={action("clicked")}
    />
  ));
