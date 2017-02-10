/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@kadira/storybook";

import Filter from "../Filter";

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

storiesOf("Filter", module)
  .add("with no filter list", () => (
    <Filter />
  ))
  .add("with sample filter list", () => (
    <Filter filterList={testFilterList} />
  ));
