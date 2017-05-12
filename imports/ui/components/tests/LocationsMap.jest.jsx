// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { Meteor } from "meteor/meteor";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import LocationsMap from "../LocationsMap";
import sampleVenues from "../../../data/state/stores/tests/sampleVenueData";

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
      sampleVenues[0],
      sampleVenues[1],
      sampleVenues[2],
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
        selectedVenueId="3"
      />);

      expect(wrapper.find("Marker").findWhere(selectedPropTrue).length).toBe(1);
    });
  });
});
