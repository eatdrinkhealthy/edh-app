// @flow
import { createStore } from "redux";
import filtersReducer from "../reducers/filters";
import DEFAULT_FILTER_LIST from "../data/defaultFilters";

/* global window */

const defaultState = {
  filters: DEFAULT_FILTER_LIST,
};

/* eslint-disable no-underscore-dangle */
const store = createStore(filtersReducer, defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

export default store;
