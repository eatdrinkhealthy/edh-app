// @flow
import DEFAULT_FILTER_LIST from "../data/defaultFilters";
import { SET_FILTER } from "../actions/actionTypes";

// eslint-disable-next-line no-duplicate-imports
import type { IFilter } from "../data/defaultFilters";
import type { IFilterAction } from "../actions/actionCreators";

export const setFilter = (state: Array<IFilter>, id: string, checked: boolean): Array<IFilter> => (
  state.map((filter: IFilter): IFilter => (
    {
      ...filter,  // generate copy of each filter, then overwrite 'on' as needed
      on: filter.id === id ? checked : filter.on,
    }
  ))
);

const filters = (
  state: Array<IFilter> = DEFAULT_FILTER_LIST,
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
