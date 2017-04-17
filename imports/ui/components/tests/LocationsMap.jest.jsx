// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { Meteor } from "meteor/meteor";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LocationsMap from "../LocationsMap";

describe("<LocationsMap />", function () {
  it("matches render snapshot", function () {
    // TODO - to capture more snapshot detail, use mount or react-test-renderer (BOTH FAIL HERE)
    const wrapper = shallow(<LocationsMap
      googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
      setSelectedVenueHandler={jest.fn()}
      selectedVenueId={null}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe("LocationsMap markers", function () {
    const testVenues = [
      { id: "A", name: "testVenueA", location: { lat: 32.789008, lng: -79.932115 } },
      { id: "B", name: "testVenueB", location: { lat: 32.789659, lng: -79.935796 } },
      { id: "C", name: "testVenueC", location: { lat: 32.785699, lng: -79.935796 } },
    ];
    const selectVenue = jest.fn();

    // eslint-disable-next-line flowtype/require-return-type, flowtype/require-parameter-type
    const selectedPropTrue = node => node.props().selected === true;

    it("should display provided search results as markers", function () {
      const wrapper = shallow(<LocationsMap
        googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
        venues={testVenues}
        setSelectedVenueHandler={selectVenue}
        selectedVenueId={null}
      />);

      expect(wrapper.find("Marker").length).toBe(3);
    });

    it("should have no 'selected' markers when selectedVenueId provided null", function () {
      const wrapper = shallow(<LocationsMap
        googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
        venues={testVenues}
        setSelectedVenueHandler={selectVenue}
        selectedVenueId={null}
      />);

      expect(wrapper.find("Marker").findWhere(selectedPropTrue).length).toBe(0);
    });

    it("should have one 'selected' marker when provided a matching selectedVenueId", function () {
      const wrapper = shallow(<LocationsMap
        googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
        venues={testVenues}
        setSelectedVenueHandler={selectVenue}
        selectedVenueId="A"
      />);

      expect(wrapper.find("Marker").findWhere(selectedPropTrue).length).toBe(1);
    });
  });
});
