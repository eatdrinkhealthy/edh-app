// @flow
import { combineReducers } from "redux";
import filters from "./filters";
import searchResults from "./searchResults";
import type { IFilter } from "../data/defaultFilters";
import type { IFoursquareVenue } from "../../../api/foursquare/foursquareApi";

export type IState = {
  filters: Array<IFilter>,
  searchResults: Array<IFoursquareVenue>,
  map: {
    selectedVenue: ?string,
  }
};

const appReducer = combineReducers({
  filters,
  searchResults,
});

export default appReducer;
