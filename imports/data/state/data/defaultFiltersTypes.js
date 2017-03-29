// @flow

export type IFilter = {
  id: string,
  name: string,
  on: boolean,
  foursquareCategory: string,
};

export type IFilterList = Array<IFilter>;
