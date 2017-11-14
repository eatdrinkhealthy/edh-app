// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies, import/first */

// mock AlertMessage component (call to warning method)
// eslint-disable-next-line flowtype/require-return-type
jest.mock("../../components/AlertMessage", () => (
  class AlertMessage {
    static warning = jest.fn();
  }
));

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import { createStore } from "redux";
import appReducer from "../../../state/reducers";
import MapContainer, { MapWrapper } from "../MapContainer";
import sampleVenues from "../../../state/stores/tests/sampleVenueData";

/* eslint-disable no-duplicate-imports */
import type { IState } from "../../../state/stores/store";
import type { IEatDrinkFilter } from "../../../state/reducers/eatDrinkFiltersReducers";
/* eslint-enable no-duplicate-imports */

import AlertMessage from "../../components/AlertMessage";

describe("<MapWrapper />", function () {
  const testFilterList: Array<IEatDrinkFilter> = [
    { id: "jb1", name: "Juice Bar1", on: true, foursquareCategory: "1" },
    { id: "jb2", name: "Juice Bar2", on: false, foursquareCategory: "2" },
    { id: "jb3", name: "Juice Bar3", on: false, foursquareCategory: "3" },
  ];

  it("matches render snapshot", function () {
    // TODO - to capture more snapshot detail, use mount or react-test-renderer (BOTH FAIL HERE)
    const wrapper = shallow(<MapWrapper
      eatDrinkFilters={testFilterList}
      searchResults={[]}
      setSearchResultsHandler={jest.fn()}
      setSelectedVenueHandler={jest.fn()}
      selectedVenueId={null}
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("calls AlertMessage.warning when calling getNearbyPlacesCB with an error", function () {
    // TODO - to capture more snapshot detail, use mount or react-test-renderer (BOTH FAIL HERE)
    const wrapper = shallow(<MapWrapper
      eatDrinkFilters={testFilterList}
      searchResults={[]}
      setSearchResultsHandler={jest.fn()}
      setSelectedVenueHandler={jest.fn()}
      selectedVenueId={null}
    />);
    // $FlowFixMe (ignoring 'getNearbyPlacesCB' is not method of React$Component)
    wrapper.instance().getNearbyPlacesCB("some error", undefined);
    expect(AlertMessage.warning).toHaveBeenCalledWith("Unable to search at this time...");
  });

  it("calls AlertMessage.warning when calling getNearbyPlacesCB with no search results", function () {
    // TODO - to capture more snapshot detail, use mount or react-test-renderer (BOTH FAIL HERE)
    const wrapper = shallow(<MapWrapper
      eatDrinkFilters={testFilterList}
      searchResults={[]}
      setSearchResultsHandler={jest.fn()}
      setSelectedVenueHandler={jest.fn()}
      selectedVenueId={null}
    />);
    // $FlowFixMe (ignoring 'getNearbyPlacesCB' is not method of React$Component)
    wrapper.instance().getNearbyPlacesCB(undefined, []);
    expect(AlertMessage.warning).toHaveBeenCalledWith("No search results for current criteria...");
  });
});

describe("<MapContainer />", function () {
  const testDefaultState: IState = {
    filters: [
      { id: "juiceBar", name: "Juice Bar", on: true, foursquareCategory: "1" },
      { id: "cafe", name: "Cafe", on: false, foursquareCategory: "2" },
      { id: "market", name: "Market", on: false, foursquareCategory: "3" },
    ],
    eatDrinkFilters: [
      { id: "vegan", name: "Vegan", on: true, foursquareCategory: "4" },
      { id: "bakery", name: "Bakery", on: false, foursquareCategory: "5" },
      { id: "farmersMarket", name: "Farmers Market", on: false, foursquareCategory: "6" },
    ],
    venueTypeFilters: [
      { id: "coffeeShop", name: "Coffee Shop", on: true, foursquareCategory: "7" },
      { id: "grocery", name: "Market / Store", on: false, foursquareCategory: "8" },
      { id: "healthFoodStore", name: "Health Food Store", on: false, foursquareCategory: "9" },
    ],
    searchResults: [
      sampleVenues[3],
      sampleVenues[4],
      sampleVenues[5],
    ],
    mapDisplay: { selectedVenueId: "B" },
  };

  const testStore = createStore(
    appReducer,
    testDefaultState,
  );

  const wrapper = mount(
    <Provider store={testStore}>
      <MemoryRouter>
        <MapContainer />
      </MemoryRouter>
    </Provider>,
  );

  it("should set search results for MapWrapper from state", function () {
    expect(wrapper.find("MapWrapper").at(0).props().searchResults)
      .toEqual(testDefaultState.searchResults);
  });

  it("should set selectedVenueId from state", function () {
    expect(wrapper.find("MapWrapper").at(0).props().selectedVenueId)
      .toEqual(testDefaultState.mapDisplay.selectedVenueId);
  });
});
