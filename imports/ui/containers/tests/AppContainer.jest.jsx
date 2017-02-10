/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import AppContainer from "../AppContainer";

describe("<AppContainer />", function () {
  it.skip("matches render snapshot", function () {
    const tree = renderer.create(<AppContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches shallow html snapshot", function () {
    const renderedHTML = shallow(<AppContainer />).html();
    expect(renderedHTML).toMatchSnapshot();
  });

  it("renders Navbar and LocationsMap components", function () {
    const wrapper = shallow(<AppContainer />);
    expect(wrapper.find("Navbar").length).toBe(1);
    expect(wrapper.find("LocationsMap").length).toBe(1);
  });
});
