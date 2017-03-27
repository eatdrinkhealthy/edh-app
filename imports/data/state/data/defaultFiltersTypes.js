// @flow

export type IFilter = {
  id: string,
  name: string,
  on: boolean,
  fourSquareCategory: string,
};

export type IFilterList = Array<IFilter>;
