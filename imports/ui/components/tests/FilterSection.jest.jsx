// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import renderer from "react-test-renderer";
import { mount } from "enzyme";
import FilterSection from "../FilterSection";
import type { IEatDrinkFilter } from "../../../state/reducers/eatDrinkFiltersReducers";

describe("<FilterSection />", function () {
  const testFilterList: Array<IEatDrinkFilter> = [
    { id: "juiceBar1", name: "Juice Bar1", on: true, foursquareCategory: "1" },
    { id: "juiceBar2", name: "Juice Bar2", on: false, foursquareCategory: "2" },
    { id: "juiceBar3", name: "Juice Bar3", on: false, foursquareCategory: "3" },
    { id: "juiceBar4", name: "Juice Bar4", on: true, foursquareCategory: "4" },
    { id: "juiceBar5", name: "Juice Bar5", on: false, foursquareCategory: "5" },
    { id: "juiceBar6", name: "Juice Bar6", on: false, foursquareCategory: "6" },
  ];

  it("matches render snapshot", function () {
    const tree = renderer.create(
      <FilterSection
        id="testFilter"
        title="Test Filter Section"
        filters={testFilterList}
        setFilter={() => {}}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("should call setFilter with filter id, when a Pill is clicked", function () {
    const props = {
      id: "testFilter",
      title: "Test Filter Section",
      filters: testFilterList,
      setFilter: jest.fn(),
    };

    const wrapper = mount(<FilterSection {...props} />);
    wrapper.find("[name='juiceBar1']").simulate("click");
    // NOTE: I have tried using 'toHaveBeenCalledWith' here, it was unreliable
    expect(props.setFilter.mock.calls[0][0]).toEqual("juiceBar1");
  });
});
