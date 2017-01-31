/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from "react";
import renderer from "react-test-renderer";
import Filter, { FilterItem } from "../Filter";

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

describe("<Filter />", function () {
  it("renders correctly", function () {
    const tree = renderer.create(<Filter filterList={testFilterList} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a header and no toggle components for empty filter list", function () {
    const tree = renderer.create(<Filter />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<FilterItem />", function () {
  it("renders correctly", function () {
    const filterItem = testFilterList.juiceBar1;
    const tree = renderer.create(<FilterItem filterKey="juiceBar1" name={filterItem.name} />);
    expect(tree).toMatchSnapshot();
  });
});
