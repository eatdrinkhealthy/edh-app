// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import renderer from "react-test-renderer";
import {
  shallow,
  mount,
} from "enzyme";
import FilterList, { FilterItem } from "../FilterList";
import type { IFilterList } from "../../../data/state/data/defaultFiltersTypes";

describe("Filter List Components", function () {
  const testFilterList: IFilterList = [
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
  ];

  describe("<FilterItem />", function () {
    it("matches render snapshot", function () {
      const tree = renderer.create(
        <FilterItem
          label={testFilterList[0].name}
          filterId={testFilterList[0].id}
          filterOn={testFilterList[0].on}
          setFilterHandler={jest.fn()}
        />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it("should call setFilter when clicked", function () {
      const props = {
        label: testFilterList[0].name,
        filterId: testFilterList[0].id,
        filterOn: testFilterList[0].on,
        setFilterHandler: jest.fn(),
      };

      const wrapper = shallow(<FilterItem {...props} />);
      const toggleComponent = wrapper.find("Toggle");
      expect(toggleComponent.length).toEqual(1);

      const event = {
        target: {
          id: "abc",
          checked: true,
        },
      };

      toggleComponent.props().onChange(event);
      expect(props.setFilterHandler.mock.calls.length).toBe(1);
    });
  });

  describe("<FilterList />", function () {
    it("matches render snapshot, with a filter list", function () {
      const tree = renderer.create(
        <FilterList
          filterList={testFilterList}
          setFilterHandler={jest.fn()}
        />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it("matches render snapshot, with no filter list", function () {
      const tree = renderer.create(
        <FilterList
          setFilterHandler={jest.fn()}
        />).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it("renders a toggle component for each filter in the list", function () {
      const wrapper = mount(
        <FilterList
          filterList={testFilterList}
          setFilterHandler={jest.fn()}
        />);

      expect(wrapper.find("Toggle").length).toBe(3);
    });

    it("renders no toggle components when no filter list provided", function () {
      const wrapper = mount(
        <FilterList
          setFilterHandler={jest.fn()}
        />);

      expect(wrapper.find("Toggle").length).toBe(0);
    });
  });
});
