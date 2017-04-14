// @flow
import { combineReducers } from "redux";
import filters from "./filtersReducers";
import searchResults from "./searchResultsReducers";
import mapDisplay from "./mapDisplayReducers";

const appReducer = combineReducers({
  filters,
  searchResults,
  mapDisplay,
});

export default appReducer;
