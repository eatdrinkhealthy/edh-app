/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from "react";
import renderer from "react-test-renderer";
import Filter, { FilterItem } from "../Filter";
import FILTER_LIST from "../../../api/filters";

describe("<Filter />", function () {
  it("renders correctly", function () {
    const tree = renderer.create(<Filter filterList={FILTER_LIST} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a header and no toggle components for empty filter list", function () {
    const tree = renderer.create(<Filter />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<FilterItem />", function () {
  it("renders correctly", function () {
    const filterItem = FILTER_LIST[0];
    const tree = renderer.create(<FilterItem filter={filterItem} />);
    expect(tree).toMatchSnapshot();
  });
});
