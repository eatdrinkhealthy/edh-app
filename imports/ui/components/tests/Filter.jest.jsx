/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

import React from "react";
import { shallow } from "enzyme";
import Filter from "../Filter";

describe("<Filter />", function () {
  it("renders a header and toggle component for each filter object in filter list", function () {
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

    const wrapper = shallow(<Filter filterList={testFilterList} />);
    expect(wrapper.type()).toEqual("div");
    expect(wrapper.find(".filter-header").length).toEqual(1);
    expect(wrapper.find("h4").text()).toEqual("Filter");
    expect(wrapper.find(".close-filter.toggle-filter").length).toEqual(1);
    expect(wrapper.find("Toggle").length).toEqual(3);
  });

  it("renders a header and no toggle components for empty filter list", function () {
    const testFilterList = {};

    const wrapper = shallow(<Filter filterList={testFilterList} />);
    expect(wrapper.type()).toEqual("div");
    expect(wrapper.find(".filter-header").length).toEqual(1);
    expect(wrapper.find("h4").text()).toEqual("Filter");
    expect(wrapper.find(".close-filter.toggle-filter").length).toEqual(1);
    expect(wrapper.find("Toggle").length).toEqual(0);
  });
});
