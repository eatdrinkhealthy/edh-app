import React from "react";
import { storiesOf, action } from "@kadira/storybook";

import Filter from "../Filter";

const testFilterList = {
  juiceBar1: {
    name: "Juice Bars 1",
    fourSquareCategory: "1",
  },
  juiceBar2: {
    name: "Juice Bars 2",
    fourSquareCategory: "2",
  },
  juiceBar3: {
    name: "Juice Bars 3",
    fourSquareCategory: "3",
  },
};

storiesOf("Filter", module)
  .add("with no filter list", () => (
    <Filter />
  ))
  .add("with sample filter list", () => (
    <Filter filterList={testFilterList} />
  ));
