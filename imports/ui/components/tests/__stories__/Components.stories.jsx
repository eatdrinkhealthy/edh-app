
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { storiesOf } from "@kadira/storybook";
import { withKnobs } from "@kadira/storybook-addon-knobs";
import backgrounds from "react-storybook-addon-backgrounds";

import Filter, { FilterItem } from "../../Filter";
import Navbar from "../../Navbar";
import Sidebar from "../../Sidebar";

const Center = ({ children }) => (
  <div className="floating locked-sides locked-ends scrollable">
    <div className="floating__item one-whole text-left soft">
      { children }
    </div>
  </div>
);

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
  .addDecorator(withKnobs)
  .addDecorator(backgrounds([
    { name: "Light Steel Blue", value: "lightsteelblue" },
    { name: "EDH Gradient", value: "-webkit-linear-gradient(-45deg, #048ec5 0%, #2ecc71 100%)" },
  ]))
  .add("Filter - no list", () => (
    <Filter />
  ))
  .add("Filter - sample list", () => (
    <Filter filterList={testFilterList} />
  ))
  .add("Navbar", () => (
    <Navbar />
  ))
  .add("Sidebar", () => (
    <Sidebar />
  ));

storiesOf("Components", module)
  .addDecorator(withKnobs)
  .addDecorator(backgrounds([
    { name: "Light Steel Blue", value: "lightsteelblue" },
    { name: "EDH Gradient", value: "-webkit-linear-gradient(-45deg, #048ec5 0%, #2ecc71 100%)" },
  ]))
  .add("Filter Item", () => (
    <Center>
      <FilterItem label="Juice Bar" filterId="juicebar1" />
    </Center>
  ));
