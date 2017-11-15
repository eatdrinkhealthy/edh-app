// @flow
import { SET_SEARCH_RESULTS } from "../actions/actionTypes";

import type { ISearchResultsAction } from "../actions/searchResultsActions";

export type IVenue = {
  id: string,
  name: string,
  location: {
    lat: number,
    lng: number,
    address: string,
    city: string,
    postalCode: string,
  },
  primaryCategory: string,
};

const searchResults = (
  state: Array<IVenue> = [],
  action: ISearchResultsAction,
): Array<IVenue> => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      // TODO note, searchResults is already a clone,
      // determine if a best practice to clone the payload
      // (here it is a reference to the action payload)
      return [...action.searchResults];

    default:
      return state;
  }
};

export default searchResults;
