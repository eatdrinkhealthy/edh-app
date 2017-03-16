// @flow
import SET_FILTER from "./actionTypes";

export type IFilterAction = {
  type: string,
  id: string,
  checked: boolean,
};

const setFilter = (id: string, checked: boolean): IFilterAction => ({
  type: SET_FILTER,
  id,
  checked,
});

export default setFilter;
