// @flow
import EAT_DRINK_FILTER_LIST from "../data/defaultFilters";
import { SET_EAT_DRINK_FILTER } from "../actions/actionTypes";
import type { IEatDrinkFilterAction } from "../actions/eatDrinkFiltersActions";

export type IEatDrinkFilter = {
  id: string,
  name: string,
  on: boolean,
  foursquareCategory: string,
};

export const setEatDrinkFilter = (
  state: Array<IEatDrinkFilter>,
  id: string,
  checked: boolean,
): Array<IEatDrinkFilter> => (
  state.map((filter: IEatDrinkFilter): IEatDrinkFilter => (
    {
      ...filter,  // generate copy of each filter, then overwrite 'on' as needed
      on: filter.id === id ? checked : filter.on,
    }
  ))
);

const eatDrinkFilters = (
  state: Array<IEatDrinkFilter> = EAT_DRINK_FILTER_LIST,
  action: IEatDrinkFilterAction,
): Array<IEatDrinkFilter> => {
  switch (action.type) {
    case SET_EAT_DRINK_FILTER:
      return setEatDrinkFilter(state, action.id, action.checked);

    default:
      return state;
  }
};

export default eatDrinkFilters;
