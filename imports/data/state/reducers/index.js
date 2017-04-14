// @flow
import { combineReducers } from "redux";
import filters from "./filtersReducers";
import searchResults from "./searchResultsReducers";
import mapDisplay from "./mapDisplayReducers";

// eslint-disable-next-line no-duplicate-imports
import type { IMapDisplayState } from "./mapDisplayReducers";
import type { IFilter } from "../data/defaultFilters";
import type { IFoursquareVenue } from "../../../api/foursquare/foursquareApi";

export type IState = {
  filters: Array<IFilter>,
  searchResults: Array<IFoursquareVenue>,
  mapDisplay: IMapDisplayState,
};

const appReducer = combineReducers({
  filters,
  searchResults,
  mapDisplay,
});

export default appReducer;
