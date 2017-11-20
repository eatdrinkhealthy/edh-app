// @flow
import { createStore } from "redux";
import appReducer from "../reducers";
import {
  EAT_DRINK_FILTERS,
  VENUE_TYPE_FILTERS,
} from "../data/defaultFilters";
import { defaultMapDisplayState } from "../reducers/mapDisplayReducers";

/* eslint-disable no-duplicate-imports */
import type { IMapDisplayState } from "../reducers/mapDisplayReducers";
import type { IEatDrinkFilter } from "../reducers/eatDrinkFiltersReducers";
import type { IVenueTypeFilter } from "../reducers/venueTypeFiltersReducers";
import type { IVenue } from "../reducers/searchResultsReducers";
/* eslint-enable no-duplicate-imports */

export type IState = {
  eatDrinkFilters: Array<IEatDrinkFilter>,
  venueTypeFilters: Array<IVenueTypeFilter>,
  searchResults: Array<IVenue>,
  mapDisplay: IMapDisplayState,
};

export const defaultState: IState = {
  eatDrinkFilters: EAT_DRINK_FILTERS,
  venueTypeFilters: VENUE_TYPE_FILTERS,
  searchResults: [],
  mapDisplay: defaultMapDisplayState,
};

/* eslint-disable no-underscore-dangle */
const store = createStore(
  appReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable no-underscore-dangle */

export default store;
