// @flow
import { SET_FILTER } from "./actionTypes";

export type IFilterAction = {
  type: string,
  id: string,
  checked: boolean,
};

// eslint-disable-next-line import/prefer-default-export
export const setFilter = (
  id: string,
  checked: boolean,
): IFilterAction => ({
  type: SET_FILTER,
  id,
  checked,
});
