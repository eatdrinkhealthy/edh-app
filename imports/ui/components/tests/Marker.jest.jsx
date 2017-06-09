// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { mount, shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as chpMod from "../../../utils/calcHintPosition";
import Marker from "../Marker";
import sampleVenues from "../../../data/state/stores/tests/sampleVenueData";

const stubFn = jest.fn();

describe("<Marker />", function () {
  // Per a React blog post, when using renderer, must mock out refs
  // https://facebook.github.io/react/blog/2016/11/16/react-v15.4.0.html#mocking-refs-for-snapshot-testing
  // eslint-disable-next-line flowtype/no-weak-types
  function createNodeMock(element: HTMLElement): ?Object {
    if (element.type === "div") {
      return {
        getBoundingClientRect() {
        },
      };
    }
    return null;
  }

  const options = { createNodeMock };

  const testVenue = { ...sampleVenues[0] };  // create a copy of a sample venue object

  const chpSpy = jest.spyOn(chpMod, "calcHintPosition");

  afterEach(function () {
    chpSpy.mockClear();
  });

  it("matches render snapshot, unselected", function () {
    const tree = renderer.create(<Marker
      venue={testVenue}
      setSelectedVenueHandler={stubFn}
    />, options).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot, selected", function () {
    const tree = renderer.create(<Marker
      venue={testVenue}
      selected
      setSelectedVenueHandler={stubFn}
    />, options).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have default style and origin classes", function () {
    const wrapper = shallow(<Marker
      venue={testVenue}
      setSelectedVenueHandler={stubFn}
    />);
    expect(wrapper.hasClass("markerContainer")).toBe(true);
    expect(wrapper.hasClass("markerOriginBottomCenter")).toBe(true);
  });

  it("should have class 'hint--bottom' if no getHintViewArea prop is passed", function () {
    const wrapper = shallow(<Marker
      venue={testVenue}
      setSelectedVenueHandler={stubFn}
    />);

    expect(wrapper.hasClass("hint--bottom")).toBe(true);
  });

  it("should call setSelectedVenueHandler when clicked", function () {
    const props = {
      venue: testVenue,
      setSelectedVenueHandler: jest.fn(),
    };

    const wrapper = mount(<Marker {...props} />);
    wrapper.find("div.markerContainer").simulate("click");
    expect(props.setSelectedVenueHandler).toHaveBeenCalledTimes(1);
    expect(props.setSelectedVenueHandler).toHaveBeenCalledWith("1"); // value from sampleVenueData
  });

  it("should call calcHintPosition when clicked", function () {
    const props = {
      venue: testVenue,
      setSelectedVenueHandler: jest.fn(),
    };

    const wrapper = mount(<Marker {...props} />);
    wrapper.find("div.markerContainer").simulate("click");
    expect(chpSpy).toHaveBeenCalledTimes(1);
  });
});
