/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@kadira/storybook";
import { text, boolean } from "@kadira/storybook-addon-knobs";
import CenterWrapper from "../../../../../.storybook/decorators/CenterWrapper";

import Filter, { FilterItem } from "../../Filter";
import Sidebar from "../../Sidebar";

const testFilterList = [
  {
    id: "juiceBar1",
    name: "Juice Bars 1",
    fourSquareCategory: "1",
  },
  {
    id: "juiceBar2",
    name: "Juice Bars 2",
    fourSquareCategory: "2",
  },
  {
    id: "juiceBar3",
    name: "Juice Bars 3",
    fourSquareCategory: "3",
  },
];

storiesOf("Modals", module)
  .add("Sidebar", () => (
    <Sidebar />
  ))
  .add("Filter Item", () => (
    <CenterWrapper
      horizontalCenter={boolean("Horizontal Center", true)}
      border={boolean("Border", false)}
    >
      <FilterItem label={text("Label", "Fruity's Juice Bar")} filterId="juicebar1" />
    </CenterWrapper>
  ))
  .add("Filter - no list", () => (
    <Filter />
  ))
  .add("Filter - sample list", () => (
    <Filter filterList={testFilterList} />
  ));
