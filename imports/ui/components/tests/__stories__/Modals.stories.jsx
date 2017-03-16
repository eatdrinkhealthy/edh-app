/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@kadira/storybook";
import { text, boolean } from "@kadira/storybook-addon-knobs";
import CenterWrapper from "../../../../../.storybook/decorators/CenterWrapper";

import FilterList, { FilterItem } from "../../FilterList";
import Sidebar from "../../Sidebar";

const testFilterList = [
  {
    id: "juiceBar1",
    name: "Juice Bars 1",
    on: true,
    fourSquareCategory: "1",
  },
  {
    id: "juiceBar2",
    name: "Juice Bars 2",
    on: false,
    fourSquareCategory: "2",
  },
  {
    id: "juiceBar3",
    name: "Juice Bars 3",
    on: false,
    fourSquareCategory: "3",
  },
];

storiesOf("Modals", module)
  .add("Sidebar", () => (
    <Sidebar />
  ))
  .add("FilterItem", () => (
    <CenterWrapper
      horizontalCenter={boolean("Horizontal Center", true)}
      border={boolean("Border", false)}
    >
      <FilterItem label={text("Label", "Fruity's Juice Bar")} filterId="juicebar1" />
    </CenterWrapper>
  ))
  .add("FilterList - no list", () => (
    <FilterList />
  ))
  .add("FilterList - sample list", () => (
    <FilterList filterList={testFilterList} />
  ));
