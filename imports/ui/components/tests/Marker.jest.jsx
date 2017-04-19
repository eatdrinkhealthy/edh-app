// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Marker from "../Marker";

describe("<Marker />", function () {
  it("matches render snapshot, unselected", function () {
    const tree = renderer.create(<Marker
      venueId={"abc"}
      setSelectedVenueHandler={() => {}}
    />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("matches render snapshot, selected", function () {
    const tree = renderer.create(<Marker
      venueId={"abc"}
      selected
      setSelectedVenueHandler={() => {}}
    />).toJSON();
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
