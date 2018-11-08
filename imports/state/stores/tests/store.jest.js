// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import store, { defaultState } from "../store";
import { eatDrinkFiltersReducer } from "../../reducers/eatDrinkFiltersReducers";
import { toggleEatDrinkFilter } from "../../actions/eatDrinkFiltersActions";
import { venueTypeFiltersReducer } from "../../reducers/venueTypeFiltersReducers";
import { toggleVenueTypeFilter } from "../../actions/venueTypeFiltersActions";
import searchResultsReducer from "../../reducers/searchResultsReducers";
import { setSearchResults } from "../../actions/searchResultsActions";
import mapDisplayReducer from "../../reducers/mapDisplayReducers";
import {
  setSelectedVenue,
  setUserLocation,
  setMapCenter,
  setMapZoom,
} from "../../actions/mapDisplayActions";
import sampleVenues from "./sampleVenueData";

describe("store - smoke test", function() {
  it("should return a default state", function() {
    expect(store.getState()).toEqual(expect.objectContaining(defaultState));
  });

  describe("eat drink filters state", function() {
    it("should return the initial state of eat drink filters reducer", function() {
      const unknownAction = { type: "unknown", id: "a" };
      expect(store.getState().eatDrinkFilters).toEqual(
        eatDrinkFiltersReducer(undefined, unknownAction),
      );
    });

    it("should handle a toggleEatDrinkFilter action", function() {
      store.dispatch(toggleEatDrinkFilter("vegan"));
      expect(store.getState().eatDrinkFilters[0].on).toEqual(true);
    });
  });

  describe("venue type filters state", function() {
    it("should return the initial state of venue type filters reducer", function() {
      const unknownAction = { type: "unknown", id: "a" };
      expect(store.getState().venueTypeFilters).toEqual(
        venueTypeFiltersReducer(undefined, unknownAction),
      );
    });

    it("should handle a toggleVenueTypeFilter action", function() {
      store.dispatch(toggleVenueTypeFilter("restaurant"));
      expect(store.getState().venueTypeFilters[0].on).toEqual(true);
    });
  });

  describe("searchResults state", function() {
    it("should return the initial state of the searchResults reducer", function() {
      const unknownAction = { type: "unknown", searchResults: [sampleVenues[0]] };
      expect(store.getState().searchResults).toEqual(
        searchResultsReducer(undefined, unknownAction),
      );
    });

    it("should handle a setSearchResults action", function() {
      const nextState = [sampleVenues[0], sampleVenues[1], sampleVenues[2]];

      store.dispatch(setSearchResults(nextState));
      expect(store.getState().searchResults).toEqual(nextState);
    });
  });

  describe("mapDisplay state", function() {
    it("should return the initial state of the mapDisplay reducer", function() {
      const unknownAction = { type: "unknown", venueId: "abc" };
      expect(store.getState().mapDisplay).toEqual(
        mapDisplayReducer(undefined, unknownAction),
      );
    });

    it("should handle a setSelectedVenue action", function() {
      store.dispatch(setSelectedVenue("abc"));
      expect(store.getState().mapDisplay.selectedVenueId).toEqual("abc");
    });

    it("should handle a setUserLocation action", function() {
      store.dispatch(setUserLocation({ lat: 1, lng: 2 }));
      expect(store.getState().mapDisplay.userLocation).toEqual({ lat: 1, lng: 2 });
    });

    it("should handle a setMapCenter action", function() {
      store.dispatch(setMapCenter({ lat: 4, lng: 6 }));
      expect(store.getState().mapDisplay.mapCenter).toEqual({ lat: 4, lng: 6 });
    });

    it("should handle a setMapZoom action", function() {
      store.dispatch(setMapZoom(10));
      expect(store.getState().mapDisplay.zoom).toEqual(10);
    });
  });
});
