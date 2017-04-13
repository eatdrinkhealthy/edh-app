// @flow
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf, action } from "@kadira/storybook";
import { text, boolean } from "@kadira/storybook-addon-knobs";
import CenterWrapper from "../../../../../.storybook/decorators/CenterWrapper";

import FilterList, { FilterItem } from "../../FilterList";
import Sidebar from "../../Sidebar";

const testFilterList = [
  {
    id: "juiceBar1",
    name: "Juice Bars 1",
    on: true,
    foursquareCategory: "1",
  },
  {
    id: "juiceBar2",
    name: "Juice Bars 2",
    on: false,
    foursquareCategory: "2",
  },
  {
    id: "juiceBar3",
    name: "Juice Bars 3",
    on: false,
    foursquareCategory: "3",
  },
];

// NOTE without state, and en event handler that toggles 'filterOn'
//      the toggle component will not visually toggle

storiesOf("Modals", module)
  .add("Sidebar", (): React$Element<*> => (
    <Sidebar />
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
