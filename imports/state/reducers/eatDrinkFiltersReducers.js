// @flow
import { EAT_DRINK_FILTERS } from "../data/defaultFilters";
import { TOGGLE_EAT_DRINK_FILTER } from "../actions/actionTypes";
import type { IEatDrinkFilterAction } from "../actions/eatDrinkFiltersActions";

export type IEatDrinkFilter = {
  id: string,
  name: string,
  on: boolean,
  foursquareCategory: string,
};

export const toggleEatDrinkFilter = (
  state: Array<IEatDrinkFilter>,
  id: string,
): Array<IEatDrinkFilter> => (
  state.map((currFilter: IEatDrinkFilter): IEatDrinkFilter => (
    {
      ...currFilter,  // generate copy of current filter, then overwrite 'on' when id matches
      on: currFilter.id === id ? !currFilter.on : currFilter.on,
    }
  ))
);

const eatDrinkFilters = (
  state: Array<IEatDrinkFilter> = EAT_DRINK_FILTERS,
  action: IEatDrinkFilterAction,
): Array<IEatDrinkFilter> => {
  switch (action.type) {
    case TOGGLE_EAT_DRINK_FILTER:
      return toggleEatDrinkFilter(state, action.id);

    default:
      return state;
  }
};

export default eatDrinkFilters;
