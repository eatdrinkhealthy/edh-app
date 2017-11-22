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
import _ from "lodash";
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
  const edFilterList: Array<IEatDrinkFilter> = [
    { id: "jb1", name: "vegan", on: true, foursquareCategory: "1" },
    { id: "jb2", name: "raw", on: false, foursquareCategory: "2" },
    { id: "jb3", name: "juice", on: false, foursquareCategory: "3" },
  ];

  const noEdFilterList: Array<IEatDrinkFilter> = [
    { id: "jb1", name: "vegan", on: false, foursquareCategory: "1" },
    { id: "jb2", name: "raw", on: false, foursquareCategory: "2" },
    { id: "jb3", name: "juice", on: false, foursquareCategory: "3" },
  ];

  const vtFilterList: Array<IEatDrinkFilter> = [
    { id: "vt1", name: "Restaurant", on: true, foursquareCategory: "4" },
    { id: "vt2", name: "Coffee Shop", on: false, foursquareCategory: "5" },
    { id: "vt3", name: "Market", on: false, foursquareCategory: "6" },
  ];

  const noVtFilterList: Array<IEatDrinkFilter> = [
    { id: "vt1", name: "Restaurant", on: false, foursquareCategory: "4" },
    { id: "vt2", name: "Coffee Shop", on: false, foursquareCategory: "5" },
    { id: "vt3", name: "Market", on: false, foursquareCategory: "6" },
  ];

  const stubFn = jest.fn();

  const props = {
    eatDrinkFilters: edFilterList,
    venueTypeFilters: vtFilterList,
    searchResults: [],
    setSearchResultsHandler: stubFn,
    setSelectedVenueHandler: stubFn,
    selectedVenueId: null,
  };

  it("matches render snapshot", function () {
    // TODO - to capture more snapshot detail, use mount or react-test-renderer (BOTH FAIL HERE)
    const wrapper = shallow(<MapWrapper {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("should call AlertMessage.warning when calling getNearbyPlacesCB with an error", function () {
    const wrapper = shallow(<MapWrapper {...props} />);

    // $FlowFixMe (ignoring 'getNearbyPlacesCB' is not method of React$Component error)
    wrapper.instance().getNearbyPlacesCB("some error", undefined);
    expect(AlertMessage.warning).toHaveBeenCalledWith("Unable to search at this time...");
  });

  it("should call AlertMessage.warning when getNearbyPlacesCB has filters but no search results",
    function () {
      const wrapper = shallow(<MapWrapper {...props} />);

      // $FlowFixMe (ignoring 'getNearbyPlacesCB' is not method of React$Component error)
      wrapper.instance().getNearbyPlacesCB(undefined, []);
      expect(AlertMessage.warning).toHaveBeenCalledWith("No search results for current criteria...");
    });

  it("should NOT call AlertMessage.warning when getNearbyPlacesCB has no filters, no search results",
    function () {
      const propsNoFilters = {
        eatDrinkFilters: noEdFilterList,
        venueTypeFilters: noVtFilterList,
        searchResults: [],
        setSearchResultsHandler: stubFn,
        setSelectedVenueHandler: stubFn,
        selectedVenueId: null,
      };

      const wrapper = shallow(<MapWrapper {...propsNoFilters} />);

      // $FlowFixMe (ignoring 'getNearbyPlacesCB' is not method of React$Component error)
      wrapper.instance().getNearbyPlacesCB(undefined, []);
      expect(AlertMessage.warning).not.toHaveBeenCalled();
    });

  it("should know when filter has NOT changed", function () {
    const nextProps = _.cloneDeep(props);    // make a copy of props

    const wrapper = shallow(<MapWrapper {...props} />);
    // $FlowFixMe (ignoring 'filterHasChanged' is not method of React$Component error)
    expect(wrapper.instance().filterHasChanged(nextProps)).toBe(false);
  });

  it("should know when filter has changed", function () {
    const nextProps = _.cloneDeep(props);        // make a copy of props
    nextProps.venueTypeFilters[0].on = false;    // change something in it

    const wrapper = shallow(<MapWrapper {...props} />);
    // $FlowFixMe (ignoring 'filterHasChanged' is not method of React$Component error)
    expect(wrapper.instance().filterHasChanged(nextProps)).toBe(true);
  });
});

describe("<MapContainer />", function () {
  const testDefaultState: IState = {
    eatDrinkFilters: [
      { id: "vegan", name: "Vegan", on: true, foursquareCategory: "4" },
      { id: "raw", name: "Raw", on: false, foursquareCategory: "5" },
      { id: "juice", name: "Juice", on: false, foursquareCategory: "6" },
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

  it("should set eatDrinkFilters for MapWrapper from state", function () {
    expect(wrapper.find("MapWrapper").at(0).props().eatDrinkFilters)
      .toEqual(testDefaultState.eatDrinkFilters);
  });

  it("should set venueTypeFilters for MapWrapper from state", function () {
    expect(wrapper.find("MapWrapper").at(0).props().venueTypeFilters)
      .toEqual(testDefaultState.venueTypeFilters);
  });

  it("should set search results for MapWrapper from state", function () {
    expect(wrapper.find("MapWrapper").at(0).props().searchResults)
      .toEqual(testDefaultState.searchResults);
  });

  it("should set selectedVenueId from state", function () {
    expect(wrapper.find("MapWrapper").at(0).props().selectedVenueId)
      .toEqual(testDefaultState.mapDisplay.selectedVenueId);
  });
});
