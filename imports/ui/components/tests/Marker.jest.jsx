// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Marker from "../Marker";

describe("<Marker />", function () {
  it("matches render snapshot, no text", function () {
    const tree = renderer.create(<Marker venueId={"abc"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot, with text", function () {
    const tree = renderer.create(<Marker venueId={"abc"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have default style and origin classes", function () {
    const wrapper = shallow(<Marker venueId={"abc"} />);
    expect(wrapper.hasClass("markerStyle")).toBe(true);
    expect(wrapper.hasClass("markerOriginBottomCenter")).toBe(true);
  });
});
