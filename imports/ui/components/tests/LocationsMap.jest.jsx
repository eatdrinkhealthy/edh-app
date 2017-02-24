// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */

import React from "react";
import { Meteor } from "meteor/meteor";
import {
  shallow,
} from "enzyme";
import toJson from "enzyme-to-json";
import LocationsMap from "../LocationsMap";

describe("<LocationsMap />", function () {
  it("matches render snapshot", function () {
    // TODO - to capture more snapshot detail, use mount or react-test-renderer (BOTH FAIL HERE)
    const wrapper = shallow(<LocationsMap
      googleMapsApiKey={Meteor.settings.public.googleMapsApiKey}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
