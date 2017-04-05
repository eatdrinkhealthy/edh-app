// @flow
import DEFAULT_FILTER_LIST from "../data/defaultFilters";
import SET_FILTER from "../actions/actionTypes";

// eslint-disable-next-line no-duplicate-imports
import type { IFilter } from "../data/defaultFilters";
import type { IFilterAction } from "../actions/actionCreators";

export type IState = {
  filters: Array<IFilter>,
};

const initialState: IState = {
  filters: DEFAULT_FILTER_LIST,
};

export const setFilter = (state: IState, id: string, checked: boolean): IState => (
  {
    ...state,   // generate copy of current state, then overwrite filters
    filters: state.filters.map((filter: IFilter): IFilter => (
      {
        ...filter,  // generate copy of each filter, then overwrite 'on' as needed
        on: filter.id === id ? checked : filter.on,
      }
    )),
  }
);

const filters = (state: IState = initialState, action: IFilterAction): IState => {
  switch (action.type) {
    case SET_FILTER:
      return setFilter(state, action.id, action.checked);

    default:
      return state;
  }
};

export default filters;
