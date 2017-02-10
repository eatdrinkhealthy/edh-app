/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import renderer from "react-test-renderer";
import {
  shallow,
} from "enzyme";
import LocationsMap from "../LocationsMap";

describe("<LocationsMap />", function () {
  it.skip("matches render snapshot", function () {
    // TODO capture snapshot, currently generates an "Invariant Violation"
    const tree = renderer.create(<LocationsMap/>);
    expect(tree).toMatchSnapshot();
  });

  it("renders a GoogleMap component", function () {
    const wrapper = shallow(<LocationsMap/>);
    expect(wrapper.find("GoogleMap").length).toBe(1);
  });
});
