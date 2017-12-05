// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { Meteor } from "meteor/meteor";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Map from "../Map";
import sampleVenues from "../../../state/stores/tests/sampleVenueData";

describe("<Map />", function () {
  it("matches render snapshot", function () {
    // TODO - to capture more snapshot detail, use mount or react-test-renderer (BOTH FAIL HERE)
    const wrapper = shallow(<Map
      googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
      setSelectedVenueHandler={() => {}}
      selectedVenueId={null}
      center={{ lat: 32.789008, lng: -79.932115 }}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("matches render snapshot - with userPosition pin", function () {
    const wrapper = shallow(<Map
      googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
      setSelectedVenueHandler={() => {}}
      selectedVenueId={null}
      userPosition={{ lat: 32.789008, lng: -79.932115 }}
      center={{ lat: 32.789008, lng: -79.932115 }}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe("Map markers", function () {
    const testVenues = [
      sampleVenues[0],
      sampleVenues[1],
      sampleVenues[2],
    ];

    // eslint-disable-next-line flowtype/require-return-type, flowtype/require-parameter-type
    const selectedPropTrue = node => node.props().selected === true;

    it("should display provided search results as markers", function () {
      const wrapper = shallow(<Map
        googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
        venues={testVenues}
        setSelectedVenueHandler={() => {}}
        selectedVenueId={null}
        center={{ lat: 32.789008, lng: -79.932115 }}
      />);

      expect(wrapper.find("Marker").length).toBe(3);
    });

    it("should have no 'selected' markers when selectedVenueId provided null", function () {
      const wrapper = shallow(<Map
        googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
        venues={testVenues}
        setSelectedVenueHandler={() => {}}
        selectedVenueId={null}
        center={{ lat: 32.789008, lng: -79.932115 }}
      />);

      expect(wrapper.find("Marker").findWhere(selectedPropTrue).length).toBe(0);
    });

    it("should have one 'selected' marker when provided a matching selectedVenueId", function () {
      const wrapper = shallow(<Map
        googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
        venues={testVenues}
        setSelectedVenueHandler={() => {}}
        selectedVenueId="3"
        center={{ lat: 32.789008, lng: -79.932115 }}
      />);

      expect(wrapper.find("Marker").findWhere(selectedPropTrue).length).toBe(1);
    });

    it("should clear a selected marker when the map is clicked", function () {
      const selectVenue = jest.fn();
      const wrapper = shallow(<Map
        googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
        venues={testVenues}
        setSelectedVenueHandler={selectVenue}
        selectedVenueId="3"
        center={{ lat: 32.789008, lng: -79.932115 }}
      />);

      wrapper.find("GoogleMap").simulate("click");
      expect(selectVenue).toHaveBeenCalledWith(null);
    });
  });
});
