// @flow
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import type { IFilter } from "../../data/state/data/defaultFiltersTypes";

const FilterSchema = new SimpleSchema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  on: {
    type: Boolean,
  },
  fourSquareCategory: {
    type: String,
  },
});

const getFilteredFoursquarePlaces = new ValidatedMethod({
  name: "places.getFilteredFoursquare",

  validate: new SimpleSchema({
    filterList: { type: [FilterSchema] },
  }).validator(),

  run(filterList: Array<IFilter>) {
    const searchResults = ["business 1", "business 2"];

    console.log("filterList:", filterList); // eslint-disable-line no-console

    return searchResults;
  },
});

export default getFilteredFoursquarePlaces;
