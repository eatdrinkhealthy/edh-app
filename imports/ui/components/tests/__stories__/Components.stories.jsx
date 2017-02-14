/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@kadira/storybook";

import Filter, { FilterItem } from "../../Filter";

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

storiesOf("Components", module)
  .add("Filter Item", () => (<FilterItem filter={testFilterList[0]} />))
  .add("Filter - no list", () => (
    <Filter />
  ))
  .add("Filter - sample list", () => (
    <Filter filterList={testFilterList} />
  ));
