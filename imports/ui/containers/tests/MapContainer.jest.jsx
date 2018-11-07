// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies, import/first */

// mock AlertMessage component (call to warning method)
// eslint-disable-next-line flowtype/require-return-type
jest.mock(
  "../../components/AlertMessage",
  () =>
    class AlertMessage {
      static warning = jest.fn();
    },
);

import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Meteor } from "meteor/meteor";
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
import type { IVenueTypeFilter } from "../../../state/reducers/venueTypeFiltersReducers";
import type { IMapWrapperProps } from "../MapContainer";
/* eslint-enable no-duplicate-imports */

import AlertMessage from "../../components/AlertMessage";

describe("<MapContainer />", function() {
  describe("<MapWrapper />", function() {
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

    const vtFilterList: Array<IVenueTypeFilter> = [
      { id: "vt1", name: "Restaurant", on: true, foursquareCategory: "4" },
      { id: "vt2", name: "Coffee Shop", on: false, foursquareCategory: "5" },
      { id: "vt3", name: "Market", on: false, foursquareCategory: "6" },
    ];

    const noVtFilterList: Array<IVenueTypeFilter> = [
      { id: "vt1", name: "Restaurant", on: false, foursquareCategory: "4" },
      { id: "vt2", name: "Coffee Shop", on: false, foursquareCategory: "5" },
      { id: "vt3", name: "Market", on: false, foursquareCategory: "6" },
    ];

    const stubFn = jest.fn();

    const props: IMapWrapperProps = {
      eatDrinkFilters: edFilterList,
      venueTypeFilters: vtFilterList,
      searchResults: [],
      setSearchResultsHandler: stubFn,
      setSelectedVenueHandler: stubFn,
      selectedVenueId: null,
      userLocation: null,
      mapCenter: { lat: 1, lng: 2 },
      setMapCenterHandler: stubFn,
      zoom: 6,
      setMapZoomHandler: stubFn,
    };

    it("matches render snapshot", function() {
      // TODO - to capture more snapshot detail, use mount or react-test-renderer (BOTH FAIL HERE)
      const wrapper = shallow(<MapWrapper {...props} />);

      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it("should call Foursquare API search (meteor method) using mapCenter from props", function() {
      const wrapper = mount(<MapWrapper {...props} />);

      // call with new props to trigger componentWillReceiveProps
      wrapper.setProps({
        mapCenter: { lat: 5, lng: 3 },
      });

      expect(Meteor.call).toHaveBeenCalledWith(
        "getNearbyPlaces",
        {
          latitude: 5,
          longitude: 3,
          eatDrinkFilters: [
            { id: "jb1", name: "vegan", on: true, foursquareCategory: "1" },
          ],
          venueTypeFilters: [
            { id: "vt1", name: "Restaurant", on: true, foursquareCategory: "4" },
          ],
        },
        expect.any(Function),
      );
    });

    it("should call AlertMessage.warning when calling getNearbyPlacesCB with an error", function() {
      const wrapper = shallow(<MapWrapper {...props} />);

      // $FlowFixMe (ignoring 'getNearbyPlacesCB' is not method of React$Component error)
      wrapper.instance().getNearbyPlacesCB("some error", undefined);
      expect(AlertMessage.warning).toHaveBeenCalledWith(
        "Unable to search at this time...",
      );
    });

    it("should call AlertMessage.warning when getNearbyPlacesCB has filters but no search results", function() {
      const wrapper = shallow(<MapWrapper {...props} />);

      // $FlowFixMe (ignoring 'getNearbyPlacesCB' is not method of React$Component error)
      wrapper.instance().getNearbyPlacesCB(undefined, []);
      expect(AlertMessage.warning).toHaveBeenCalledWith(
        "No search results for current criteria...",
      );
    });

    it("should NOT call AlertMessage.warning when getNearbyPlacesCB has no filters, no search results", function() {
      const propsNoFilters: IMapWrapperProps = {
        eatDrinkFilters: noEdFilterList,
        venueTypeFilters: noVtFilterList,
        searchResults: [],
        setSearchResultsHandler: stubFn,
        setSelectedVenueHandler: stubFn,
        selectedVenueId: null,
        userLocation: null,
        mapCenter: { lat: 5, lng: 6 },
        setMapCenterHandler: stubFn,
        zoom: 6,
        setMapZoomHandler: stubFn,
      };

      const wrapper = shallow(<MapWrapper {...propsNoFilters} />);

      // $FlowFixMe (ignoring 'getNearbyPlacesCB' is not method of React$Component error)
      wrapper.instance().getNearbyPlacesCB(undefined, []);
      expect(AlertMessage.warning).not.toHaveBeenCalled();
    });

    it("should know filter has NOT changed, when zoom and userLocation have changed", function() {
      const nextProps = _.cloneDeep(props); // make a copy of props
      nextProps.zoom = 18;
      nextProps.userLocation = { lat: 3, lng: 4 };

      const wrapper = shallow(<MapWrapper {...props} />);
      // $FlowFixMe (ignoring 'filterHasChanged' is not method of React$Component error)
      expect(wrapper.instance().filterHasChanged(nextProps)).toBe(false);
    });

    it("should know filter has changed when a venueTypeFilter changes", function() {
      const nextProps = _.cloneDeep(props);
      nextProps.venueTypeFilters[0].on = false;

      const wrapper = shallow(<MapWrapper {...props} />);
      // $FlowFixMe (ignoring 'filterHasChanged' is not method of React$Component error)
      expect(wrapper.instance().filterHasChanged(nextProps)).toBe(true);
    });

    it("should know filter has changed when an eatDrinkFilter changes", function() {
      const nextProps = _.cloneDeep(props);
      nextProps.eatDrinkFilters[0].on = false;

      const wrapper = shallow(<MapWrapper {...props} />);
      // $FlowFixMe (ignoring 'filterHasChanged' is not method of React$Component error)
      expect(wrapper.instance().filterHasChanged(nextProps)).toBe(true);
    });

    it("should know filter has changed when a mapCenter changes", function() {
      const nextProps = _.cloneDeep(props);
      nextProps.mapCenter = { lat: 3, lng: 4 };

      const wrapper = shallow(<MapWrapper {...props} />);
      // $FlowFixMe (ignoring 'filterHasChanged' is not method of React$Component error)
      expect(wrapper.instance().filterHasChanged(nextProps)).toBe(true);
    });

    describe("handleMapChange", function() {
      const handlerProps: IMapWrapperProps = {
        eatDrinkFilters: edFilterList,
        venueTypeFilters: vtFilterList,
        searchResults: [],
        setSearchResultsHandler: stubFn,
        setSelectedVenueHandler: stubFn,
        selectedVenueId: null,
        userLocation: null,
        mapCenter: { lat: 1, lng: 2 },
        setMapCenterHandler: jest.fn(),
        zoom: 6,
        setMapZoomHandler: jest.fn(),
      };
      const wrapper = shallow(<MapWrapper {...handlerProps} />);

      it("should call setMapCenterHandler when mapCenter has changed", function() {
        // $FlowFixMe (ignoring 'handleMapChange' is not method of React$Component error)
        wrapper.instance().handleMapChange({ center: { lat: 3, lng: 4 } });
        expect(handlerProps.setMapCenterHandler).toHaveBeenCalledWith({ lat: 3, lng: 4 });
      });

      it("should NOT call setMapCenterHandler when mapCenter has NOT changed", function() {
        // $FlowFixMe (ignoring 'handleMapChange' is not method of React$Component error)
        wrapper.instance().handleMapChange({ center: { lat: 1, lng: 2 }, zoom: 6 });
        expect(handlerProps.setMapCenterHandler).not.toHaveBeenCalled();
      });

      it("should call setMapZoomHandler when mapZoom has changed", function() {
        // $FlowFixMe (ignoring 'handleMapChange' is not method of React$Component error)
        wrapper.instance().handleMapChange({ center: { lat: 1, lng: 2 }, zoom: 7 });
        expect(handlerProps.setMapZoomHandler).toHaveBeenCalledWith(7);
      });

      it("should NOT call setMapZoomHandler when mapZoom has NOT changed", function() {
        // $FlowFixMe (ignoring 'handleMapChange' is not method of React$Component error)
        wrapper.instance().handleMapChange({ center: { lat: 1, lng: 2 }, zoom: 6 });
        expect(handlerProps.setMapZoomHandler).not.toHaveBeenCalled();
      });
    });
  });

  describe("Map redux store to MapContainer", function() {
    const testDefaultState: IState = {
      eatDrinkFilters: [
        { id: "vegan", name: "Vegan", on: true, foursquareCategory: "4" },
        { id: "raw", name: "Raw", on: false, foursquareCategory: "5" },
        { id: "juice", name: "Juice", on: false, foursquareCategory: "6" },
      ],
      venueTypeFilters: [
        { id: "coffeeShop", name: "Coffee Shop", on: true, foursquareCategory: "7" },
        { id: "grocery", name: "Market / Store", on: false, foursquareCategory: "8" },
        {
          id: "healthFoodStore",
          name: "Health Food Store",
          on: false,
          foursquareCategory: "9",
        },
      ],
      searchResults: [sampleVenues[3], sampleVenues[4], sampleVenues[5]],
      mapDisplay: {
        selectedVenueId: "B",
        userLocation: { lat: 3, lng: 4 },
        mapCenter: { lat: 5, lng: 6 },
        zoom: 6,
      },
    };

    const testStore = createStore(appReducer, testDefaultState);

    const wrapper = mount(
      <Provider store={testStore}>
        <MemoryRouter>
          <MapContainer />
        </MemoryRouter>
      </Provider>,
    );

    it("should set eatDrinkFilters for MapWrapper from redux state", function() {
      expect(
        wrapper
          .find("MapWrapper")
          .at(0)
          .props().eatDrinkFilters,
      ).toEqual(testDefaultState.eatDrinkFilters);
    });

    it("should set venueTypeFilters for MapWrapper from redux state", function() {
      expect(
        wrapper
          .find("MapWrapper")
          .at(0)
          .props().venueTypeFilters,
      ).toEqual(testDefaultState.venueTypeFilters);
    });

    it("should set search results for MapWrapper from redux state", function() {
      expect(
        wrapper
          .find("MapWrapper")
          .at(0)
          .props().searchResults,
      ).toEqual(testDefaultState.searchResults);
    });

    it("should set selectedVenueId for MapWrapper from redux state", function() {
      expect(
        wrapper
          .find("MapWrapper")
          .at(0)
          .props().selectedVenueId,
      ).toEqual(testDefaultState.mapDisplay.selectedVenueId);
    });

    it("should set userLocation for MapWrapper from redux state", function() {
      expect(
        wrapper
          .find("MapWrapper")
          .at(0)
          .props().userLocation,
      ).toEqual(testDefaultState.mapDisplay.userLocation);
    });

    it("should set mapCenter for MapWrapper from redux state", function() {
      expect(
        wrapper
          .find("MapWrapper")
          .at(0)
          .props().mapCenter,
      ).toEqual(testDefaultState.mapDisplay.mapCenter);
    });

    it("should set zoom for MapWrapper from redux state", function() {
      expect(
        wrapper
          .find("MapWrapper")
          .at(0)
          .props().zoom,
      ).toEqual(testDefaultState.mapDisplay.zoom);
    });
  });
});
