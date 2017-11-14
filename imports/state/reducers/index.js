// @flow
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import filters from "./filtersReducers";
import { eatDrinkFiltersReducer as eatDrinkFilters } from "./eatDrinkFiltersReducers";
import { venueTypeFiltersReducer as venueTypeFilters } from "./venueTypeFiltersReducers";
import searchResults from "./searchResultsReducers";
import mapDisplay from "./mapDisplayReducers";

const appReducer = combineReducers({
  filters,
  eatDrinkFilters,
  venueTypeFilters,
  searchResults,
  mapDisplay,
  form: formReducer,
});

export default appReducer;
