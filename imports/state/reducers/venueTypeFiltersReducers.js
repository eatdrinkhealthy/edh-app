// @flow
import { VENUE_TYPE_FILTERS } from "../data/defaultFilters";
import { TOGGLE_VENUE_TYPE_FILTER } from "../actions/actionTypes";
import type { IVenueTypeFilterAction } from "../actions/venueTypeFiltersActions";

export type IVenueTypeFilter = {
  id: string,
  name: string,
  on: boolean,
  foursquareCategory: string,
};

export const toggleVenueTypeFilter = (
  state: Array<IVenueTypeFilter>,
  id: string,
): Array<IVenueTypeFilter> =>
  state.map(
    (currFilter: IVenueTypeFilter): IVenueTypeFilter => ({
      ...currFilter, // generate copy of current filter, then overwrite 'on' when id matches
      on: currFilter.id === id ? !currFilter.on : currFilter.on,
    }),
  );

export const venueTypeFiltersReducer = (
  state: Array<IVenueTypeFilter> = VENUE_TYPE_FILTERS,
  action: IVenueTypeFilterAction,
): Array<IVenueTypeFilter> => {
  switch (action.type) {
    case TOGGLE_VENUE_TYPE_FILTER:
      return toggleVenueTypeFilter(state, action.id);

    default:
      return state;
  }
};
