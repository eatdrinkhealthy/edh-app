// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import {
  shallow,
} from "enzyme";
import toJson from "enzyme-to-json";
import { MapComponent } from "../MapContainer";
import type { IFilterList } from "../../../data/state/data/defaultFiltersTypes";

describe("<MapComponent />", function () {
  const testFilterList: IFilterList = [
    {
      id: "juiceBar1",
      name: "Juice Bar1",
      on: true,
      fourSquareCategory: "1",
    },
    {
      id: "juiceBar2",
      name: "Juice Bar2",
      on: false,
      fourSquareCategory: "2",
    },
    {
      id: "juiceBar3",
      name: "Juice Bar3",
      on: false,
      fourSquareCategory: "3",
    },
  ];


  it("matches render snapshot", function () {
    // TODO - to capture more snapshot detail, use mount or react-test-renderer (BOTH FAIL HERE)
    const wrapper = shallow(<MapComponent filterList={testFilterList} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
