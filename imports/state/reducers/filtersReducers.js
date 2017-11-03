// @flow
import { DEFAULT_FILTERS } from "../data/defaultFilters";
import { SET_FILTER } from "../actions/actionTypes";
import type { IFilterAction } from "../actions/filtersActions";

export type IFilter = {
  id: string,
  name: string,
  on: boolean,
  foursquareCategory: string,
};

export const setFilter = (state: Array<IFilter>, id: string, checked: boolean): Array<IFilter> => (
  state.map((filter: IFilter): IFilter => (
    {
      ...filter,  // generate copy of each filter, then overwrite 'on' as needed
      on: filter.id === id ? checked : filter.on,
    }
  ))
);

const filters = (
  state: Array<IFilter> = DEFAULT_FILTERS,
  action: IFilterAction,
): Array<IFilter> => {
  switch (action.type) {
    case SET_FILTER:
      return setFilter(state, action.id, action.checked);

    default:
      return state;
  }
};

export default filters;
