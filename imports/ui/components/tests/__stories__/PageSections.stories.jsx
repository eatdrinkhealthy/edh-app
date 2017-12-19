// @flow
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf, action } from "@storybook/react";
import { boolean, text } from "@storybook/addon-knobs";

import UserMenu from "../../UserMenu";
import Navbar from "../../Navbar";
import Header from "../../Header";
import PrimaryFilter from "../../PrimaryFilter";
import {
  EAT_DRINK_FILTERS,
  VENUE_TYPE_FILTERS,
} from "../../../../state/data/defaultFilters";

storiesOf("Page Sections", module)
  .addDecorator((story: () => React$Element<*>): React$Element<*> => (
    <MemoryRouter>{story()}</MemoryRouter>
  ))
  .add("UserMenu", (): React$Element<*> => (
    <UserMenu
      userLoggedIn={boolean("userLoggedIn", false)}
      logout={action("logout clicked")}
    />
  ))
  .add("Navbar", () => {
    window.SHOW_GRID = boolean("show grid", false);
    return (
      <Navbar
        username={text("username", "testUser")}
        userLoggedIn={boolean("userLoggedIn", true)}
        logout={action("logout clicked")}
      />
    );
  })
  .add("Header", () => {
    window.SHOW_GRID = boolean("show grid", false);
    return <Header />;
  })
  .add("PrimaryFilter", () => (
    <PrimaryFilter
      eatDrinkFilters={EAT_DRINK_FILTERS}
      toggleEatDrinkFilterHandler={action("eat drink filter clicked")}
      venueTypeFilters={VENUE_TYPE_FILTERS}
      toggleVenueTypeFilterHandler={action("venue type filter clicked")}
    />
  ));
