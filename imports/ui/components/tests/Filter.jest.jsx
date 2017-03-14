// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import renderer from "react-test-renderer";
import {
  mount,
} from "enzyme";
import Filter, { FilterItem } from "../Filter";
import type { IFilterList } from "../../../data/state/data/defaultFilters";

describe("Filter Components", function () {
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

  describe("<Filter />", function () {
    it("matches render snapshot, with a filter list", function () {
      const tree = renderer.create(<Filter filterList={testFilterList} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("matches render snapshot, with no filter list", function () {
      const tree = renderer.create(<Filter />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it("renders a toggle component for each filter in the list", function () {
      const wrapper = mount(<Filter filterList={testFilterList} />);
      expect(wrapper.find("Toggle").length).toBe(3);
    });

    it("renders no toggle components when no filter list provided", function () {
      const wrapper = mount(<Filter />);
      expect(wrapper.find("Toggle").length).toBe(0);
      expect(wrapper.find("Toggle").length).toBe(0);
    });
  });

  describe("<FilterItem />", function () {
    it("matches render snapshot", function () {
      const tree = renderer.create(
        <FilterItem
          label={testFilterList[0].name}
          filterId={testFilterList[0].id}
        />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
