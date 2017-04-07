// @flow
import { createStore } from "redux";
import appReducer from "../reducers";
import DEFAULT_FILTER_LIST from "../data/defaultFilters";

// eslint-disable-next-line no-duplicate-imports
import type { IState } from "../reducers";

/* global window */

const defaultState: IState = {
  filters: DEFAULT_FILTER_LIST,
  searchResults: [],
};

/* eslint-disable no-underscore-dangle */
const store = createStore(
  appReducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

export default store;
