// @flow
import { SET_EAT_DRINK_FILTER } from "./actionTypes";

export type IEatDrinkFilterAction = {
  type: string,
  id: string,
  checked: boolean,
};

// eslint-disable-next-line import/prefer-default-export
export const setEatDrinkFilter = (
  id: string,
  checked: boolean,
): IEatDrinkFilterAction => ({
  type: SET_EAT_DRINK_FILTER,
  id,
  checked,
});
