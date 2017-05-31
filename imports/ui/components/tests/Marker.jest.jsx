// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { mount, shallow } from "enzyme";
import renderer from "react-test-renderer";
import Marker, { calcHintPosition } from "../Marker";
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

  it("should call setSelectedVenueHandler when clicked", function () {
    const props = {
      venue: testVenue,
      setSelectedVenueHandler: jest.fn(),
    };

    const wrapper = mount(<Marker {...props} />);
    wrapper.find("div.markerContainer").simulate("click");
    expect(props.setSelectedVenueHandler.mock.calls.length).toBe(1);
    expect(props.setSelectedVenueHandler.mock.calls[0][0]).toBe("1");
  });

  it("should have class 'hint--bottom' if no getHintViewArea prop is passed", function () {
    const wrapper = shallow(<Marker
      venue={testVenue}
      setSelectedVenueHandler={stubFn}
    />);

    expect(wrapper.hasClass("hint--bottom")).toBe(true);
  });

  it.skip("should call calcHintPosition when clicked", function () {
    const props = {
      venue: testVenue,
      setSelectedVenueHandler: jest.fn(),
    };


    const wrapper = mount(<Marker {...props} />);
    wrapper.find("div.markerContainer").simulate("click");
    // expect(calcHintPosition.mock.calls.length).toBe(1);
  });

  describe("calcHintPosition", function () {
    it("should return 'hint--bottom' if first param, hintViewArea, is null", function () {
      expect(calcHintPosition(null)).toBe("hint--bottom");
    });

    it("should return 'hint--bottom' if second param, hintArea, is null", function () {
      expect(calcHintPosition({ top: 0, right: 0, bottom: 0, left: 0 }, null)).toBe("hint--bottom");
    });

    it("should return 'hint--top' if hint bottom is past hint view bottom", function () {
      const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
      const hintArea = { top: 20, right: 120, bottom: 601, left: 20 };

      expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--top");
    });

    it("should return 'hint--left' if hint right is past hint view right", function () {
      const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
      const hintArea = { top: 20, right: 120, bottom: 80, left: 20 };

      expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--left");
    });

    it("should return 'hint--right' if hint left is past hint view left", function () {
      const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
      const hintArea = { top: 20, right: 120, bottom: 80, left: 5 };

      expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--right");
    });
  });
});
