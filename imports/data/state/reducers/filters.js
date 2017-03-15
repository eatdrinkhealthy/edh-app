// @flow
import DEFAULT_FILTER_LIST from "../data/defaultFilters";
import TOGGLE_FILTER from "../actions/actionTypes";

import type { IFilterAction } from "../actions/actionCreators";
import type { IFilter, IFilterList } from "../data/defaultFiltersTypes";

type IState = {
  filters: IFilterList
};

const initialState: IState = {
  filters: DEFAULT_FILTER_LIST,
};

export const toggleFilter = (state: IState, id: string): IState => (
  {
    ...state,   // generate copy of current state, then overwrite filters
    filters: state.filters.map((filter: IFilter): IFilter => (
      {
        ...filter,  // generate copy of each filter, then overwrite 'on' as needed
        on: filter.id === id ? !filter.on : filter.on,
      }
    )),
  }
);

const filters = (state: IState = initialState, action: IFilterAction): IState => {
  switch (action.type) {
    case TOGGLE_FILTER:
      return toggleFilter(state, action.id);

    default:
      return state;
  }
};

export default filters;
