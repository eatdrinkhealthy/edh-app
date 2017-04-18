// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { createStore } from "redux";
import appReducer from "../../../data/state/reducers";
import MapContainer, { MapComponent } from "../MapContainer";

/* eslint-disable no-duplicate-imports */
import type { IFilter } from "../../../data/state/data/defaultFilters";
import type { IState } from "../../../data/state/stores/store";
/* eslint-enable no-duplicate-imports */

import { getNearbyPlaces } from "../../../api/methods";

// mock getNearbyPlaces (a method call for foursquare api)
// eslint-disable-next-line flowtype/require-return-type
jest.mock("../../../api/methods", () => ({
  getNearbyPlaces: {
    call: jest.fn(),
  },
}));

describe("<MapComponent />", function () {
  const testFilterList: Array<IFilter> = [
    { id: "jb1", name: "Juice Bar1", on: true, foursquareCategory: "1" },
    { id: "jb2", name: "Juice Bar2", on: false, foursquareCategory: "2" },
    { id: "jb3", name: "Juice Bar3", on: false, foursquareCategory: "3" },
  ];

  it("matches render snapshot", function () {
    // TODO - to capture more snapshot detail, use mount or react-test-renderer (BOTH FAIL HERE)
    const wrapper = shallow(<MapComponent
      filterList={testFilterList}
      searchResults={[]}
      setSearchResultsHandler={jest.fn()}
      setSelectedVenueHandler={jest.fn()}
      selectedVenueId={null}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe("<MapContainer />", function () {
  const testDefaultState: IState = {
    filters: [
      { id: "juiceBar", name: "Juice Bar", on: true, foursquareCategory: "1" },
      { id: "cafe", name: "Cafe", on: false, foursquareCategory: "2" },
      { id: "market", name: "Market", on: false, foursquareCategory: "3" },
    ],
    searchResults: [
      { id: "A", name: "testVenueA", location: { lat: 32.789008, lng: -79.932115 } },
      { id: "B", name: "testVenueB", location: { lat: 32.789659, lng: -79.935796 } },
      { id: "C", name: "testVenueC", location: { lat: 32.785699, lng: -79.935796 } },
    ],
    mapDisplay: { selectedVenueId: "B" },
  };

  const testStore = createStore(
    appReducer,
    testDefaultState,
  );

  const wrapper = mount(
    <Provider store={testStore}>
      <MapContainer />
    </Provider>,
  );

  it("should call getNearbyPlaces method with selected filters", function () {
    expect(getNearbyPlaces.call.mock.calls[0][0].filterList)
      .toEqual([{ id: "juiceBar", name: "Juice Bar", on: true, foursquareCategory: "1" }]);
  });

  it("should set search results for MapComponent from state", function () {
    expect(wrapper.find("MapComponent").at(0).props().searchResults)
      .toEqual(testDefaultState.searchResults);
  });

  it("should set selectedVenueId from state", function () {
    expect(wrapper.find("MapComponent").at(0).props().selectedVenueId)
      .toEqual(testDefaultState.mapDisplay.selectedVenueId);
  });
});
