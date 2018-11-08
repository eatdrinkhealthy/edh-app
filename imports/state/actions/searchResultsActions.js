// @flow
import _ from "lodash";
import { SET_SEARCH_RESULTS } from "./actionTypes";
import type { IVenue } from "../reducers/searchResultsReducers";

export type ISearchResultsAction = {
  type: string,
  searchResults: Array<IVenue>,
};

// eslint-disable-next-line import/prefer-default-export
export const setSearchResults = (searchResults: Array<IVenue>): ISearchResultsAction => ({
  type: SET_SEARCH_RESULTS,
  searchResults: _.cloneDeep(searchResults),
});
