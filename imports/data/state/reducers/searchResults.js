// @flow
import { SET_SEARCH_RESULTS } from "../actions/actionTypes";

import type { IFoursquareVenue } from "../../../api/foursquare/foursquareApi";
import type { ISearchResultsAction } from "../actions/actionCreators";

const searchResults = (
  state: Array<IFoursquareVenue> = [],
  action: ISearchResultsAction,
): Array<IFoursquareVenue> => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return [...action.searchResults];

    default:
      return state;
  }
};

export default searchResults;
