// @flow
import { createStore } from "redux";
import appReducer from "../reducers";
import DEFAULT_FILTER_LIST from "../data/defaultFilters";
import { defaultMapDisplayState } from "../reducers/mapDisplayReducers";

/* eslint-disable no-duplicate-imports */
import type { IMapDisplayState } from "../reducers/mapDisplayReducers";
import type { IFilter } from "../reducers/filtersReducers";
import type { IVenue } from "../reducers/searchResultsReducers";
/* eslint-enable no-duplicate-imports */

export type IState = {
  filters: Array<IFilter>,
  searchResults: Array<IVenue>,
  mapDisplay: IMapDisplayState,
};

export const defaultState: IState = {
  filters: DEFAULT_FILTER_LIST,
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
