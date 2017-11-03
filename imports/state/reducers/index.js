// @flow
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import filters from "./filtersReducers";
import eatDrinkFilters from "./eatDrinkFiltersReducers";
import searchResults from "./searchResultsReducers";
import mapDisplay from "./mapDisplayReducers";

const appReducer = combineReducers({
  filters,
  eatDrinkFilters,
  searchResults,
  mapDisplay,
  form: formReducer,
});

export default appReducer;
