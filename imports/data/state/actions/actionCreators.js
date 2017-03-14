// @flow
import {
  TOGGLE_FILTER,
} from "./actionTypes";

export type IFilterAction = {
  type: string,
  id: string,
};

export const toggleFilter = (id: string): IFilterAction => ({
  type: TOGGLE_FILTER,
  id,
});
