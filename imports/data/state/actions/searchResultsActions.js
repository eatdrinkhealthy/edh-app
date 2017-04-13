// @flow
import { SET_SEARCH_RESULTS } from "./actionTypes";
import type { IFoursquareVenue } from "../../../api/foursquare/foursquareApi";

export type ISearchResultsAction = {
  type: string,
  searchResults: Array<IFoursquareVenue>,
};

// eslint-disable-next-line import/prefer-default-export
export const setSearchResults = (
  searchResults: Array<IFoursquareVenue>,
): ISearchResultsAction => ({
  type: SET_SEARCH_RESULTS,
  searchResults,
});
