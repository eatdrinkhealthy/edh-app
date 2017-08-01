// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { storiesOf, action } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import CenterWrapper from "../../../../../.storybook/decorators/CenterWrapper";

import FilterList, { FilterItem } from "../../FilterList";

const testFilterList = [
  { id: "juiceBar", name: "Juice Bar", on: true, foursquareCategory: "1" },
  { id: "cafe", name: "Cafe", on: false, foursquareCategory: "2" },
  { id: "market", name: "Market", on: false, foursquareCategory: "3" },
];

// NOTE without state, and en event handler that toggles 'filterOn'
//      the toggle component will not visually toggle

storiesOf("Modals", module)
  .addDecorator((story: () => React$Element<*>): React$Element<*> => (
    <MemoryRouter>{story()}</MemoryRouter>
  ))
  .add("FilterItem", (): React$Element<*> => (
    <CenterWrapper
      horizontalCenter={boolean("Horizontal Center", true)}
      verticalCenter={boolean("Vertical Center", true)}
      childrenBorder={boolean("Children Border", false)}
    >
      <FilterItem
        label={text("Label", "Fruity's Juice Bar")}
        filterId="juicebar1"
        filterOn={false}
        setFilterHandler={action("clicked")}
      />
    </CenterWrapper>
  ))
  .add("FilterList - no list", (): React$Element<*> => (
    <FilterList setFilterHandler={action("clicked")} />
  ))
  .add("FilterList - sample list", (): React$Element<*> => (
    <FilterList
      filterList={testFilterList}
      setFilterHandler={action("clicked")}
    />
  ));
