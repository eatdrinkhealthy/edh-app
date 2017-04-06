// @flow
import { SET_FILTER, SET_SEARCH_RESULTS } from "./actionTypes";
import type { IFoursquareVenue } from "../../../api/foursquare/foursquareApi";

//
// Filter Actions
//

export type IFilterAction = {
  type: string,
  id: string,
  checked: boolean,
};

export const setFilter = (
  id: string,
  checked: boolean,
): IFilterAction => ({
  type: SET_FILTER,
  id,
  checked,
});


//
// Search Results Actions
//

export type ISearchResultsAction = {
  type: string,
  searchResults: Array<IFoursquareVenue>,
};

export const setSearchResults = (
  searchResults: Array<IFoursquareVenue>,
): ISearchResultsAction => ({
  type: SET_SEARCH_RESULTS,
  searchResults,
});
