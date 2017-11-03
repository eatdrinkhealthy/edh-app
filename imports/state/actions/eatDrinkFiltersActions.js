// @flow
import { TOGGLE_EAT_DRINK_FILTER } from "./actionTypes";

export type IEatDrinkFilterAction = {
  type: string,
  id: string,
};

// eslint-disable-next-line import/prefer-default-export
export const toggleEatDrinkFilter = (
  id: string,
): IEatDrinkFilterAction => ({
  type: TOGGLE_EAT_DRINK_FILTER,
  id,
});
