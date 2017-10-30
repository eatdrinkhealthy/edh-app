// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import FilterSection from "../FilterSection";
import type { IFilter } from "../../../state/reducers/filtersReducers";

describe("<FilterSection />", function () {
  const testFilterList: Array<IFilter> = [
    {
      id: "juiceBar1",
      name: "Juice Bar1",
      on: true,
      foursquareCategory: "1",
    },
    {
      id: "juiceBar2",
      name: "Juice Bar2",
      on: false,
      foursquareCategory: "2",
    },
    {
      id: "juiceBar3",
      name: "Juice Bar3",
      on: false,
      foursquareCategory: "3",
    },
    {
      id: "juiceBar4",
      name: "Juice Bar4",
      on: true,
      foursquareCategory: "4",
    },
    {
      id: "juiceBar5",
      name: "Juice Bar5",
      on: false,
      foursquareCategory: "5",
    },
    {
      id: "juiceBar6",
      name: "Juice Bar6",
      on: false,
      foursquareCategory: "6",
    },
  ];

  it("matches render snapshot", function () {
    const tree = renderer.create(
      <FilterSection
        title="Test Filter Section"
        filters={testFilterList}
        getFilters={() => {
        }}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should not set filters (undefined), simply after mounting component", function () {
    let filterList;

    const getTestFilters = (setFilters) => {
      filterList = setFilters.slice();
    };

    mount(<FilterSection
      title="Test Filter"
      filters={testFilterList}
      getFilters={getTestFilters}
    />);

    expect(filterList).toBe(undefined);
  });

  it("should return array with selected filter, when one is selected", function () {
    let filterList;

    const getTestFilters = (setFilters) => {
      filterList = setFilters.slice();
    };

    const wrapper = mount(<FilterSection
      title="Test Filter"
      filters={testFilterList}
      getFilters={getTestFilters}
    />);

    wrapper.find("[name='juiceBar1']").simulate("click");
    expect(filterList).toEqual(["juiceBar1"]);
  });

  it("should return array with selected filters, when two are selected", function () {
    let filterList;

    const getTestFilters = (setFilters) => {
      filterList = setFilters.slice();
    };

    const wrapper = mount(<FilterSection
      title="Test Filter"
      filters={testFilterList}
      getFilters={getTestFilters}
    />);

    wrapper.find("[name='juiceBar1']").simulate("click");
    wrapper.find("[name='juiceBar2']").simulate("click");
    expect(filterList).toEqual(["juiceBar1", "juiceBar2"]);
  });

  it("should return array with correct filters, when two are added and one removed", function () {
    let filterList;

    const getTestFilters = (setFilters) => {
      filterList = setFilters.slice();
    };

    const wrapper = mount(<FilterSection
      title="Test Filter"
      filters={testFilterList}
      getFilters={getTestFilters}
    />);

    wrapper.find("[name='juiceBar1']").simulate("click");
    wrapper.find("[name='juiceBar2']").simulate("click");
    wrapper.find("[name='juiceBar2']").simulate("click");
    expect(filterList).toEqual(["juiceBar1"]);
  });

  it("should return empty array, when filters added then removed", function () {
    let filterList;

    const getTestFilters = (setFilters) => {
      filterList = setFilters.slice();
    };

    const wrapper = mount(<FilterSection
      title="Test Filter"
      filters={testFilterList}
      getFilters={getTestFilters}
    />);

    wrapper.find("[name='juiceBar1']").simulate("click");
    wrapper.find("[name='juiceBar1']").simulate("click");
    expect(filterList).toEqual([]);
  });
});
