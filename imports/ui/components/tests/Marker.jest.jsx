// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Marker from "../Marker";

describe("<Marker />", function () {
  // Per a React blog post, when using renderer, must mock out refs
  // https://facebook.github.io/react/blog/2016/11/16/react-v15.4.0.html#mocking-refs-for-snapshot-testing
  // eslint-disable-next-line flowtype/no-weak-types
  function createNodeMock(element: HTMLElement): ?Object {
    if (element.type === "div") {
      return {
        getBoundingClientRect() {},
      };
    }
    return null;
  }

  const options = { createNodeMock };

  it("matches render snapshot, unselected", function () {
    const tree = renderer.create(<Marker
      venueId={"abc"}
      setSelectedVenueHandler={() => {}}
    />, options).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot, selected", function () {
    const tree = renderer.create(<Marker
      venueId={"abc"}
      selected
      setSelectedVenueHandler={() => {}}
    />, options).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should have default style and origin classes", function () {
    const wrapper = shallow(<Marker
      venueId={"abc"}
      setSelectedVenueHandler={() => {}}
    />);
    expect(wrapper.hasClass("markerContainer")).toBe(true);
    expect(wrapper.hasClass("markerOriginBottomCenter")).toBe(true);
  });

  it("should call setSelectedVenueHandler when clicked", function () {
    const props = {
      venueId: "abc123",
      setSelectedVenueHandler: jest.fn(),
    };

    const wrapper = shallow(<Marker {...props} />);
    wrapper.find("div.markerContainer").simulate("click");
    expect(props.setSelectedVenueHandler.mock.calls.length).toBe(1);
    expect(props.setSelectedVenueHandler.mock.calls[0][0]).toBe("abc123");
  });
});
