// @flow
import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import _ from "lodash";
import foursquareApiSearch from "./foursquareApi";

// eslint-disable-next-line no-duplicate-imports
import type { IVenue } from "../../../state/reducers/searchResultsReducers";
import type { IEatDrinkFilter } from "../../../state/reducers/eatDrinkFiltersReducers";
import type { IVenueTypeFilter } from "../../../state/reducers/venueTypeFiltersReducers";

export const buildSearchString = (
  eatDrinkFilters: Array<IEatDrinkFilter>,
  venueTypeFilters: Array<IVenueTypeFilter>,
): string => {
  const edCategories = _.map(eatDrinkFilters, filter => filter.foursquareCategory);
  const vtCategories = _.map(venueTypeFilters, filter => filter.foursquareCategory);
  const allCategories = _.union(edCategories, vtCategories);

  return _.join(allCategories);
};

export const collectSearchResults = (
  latitude: number,
  longitude: number,
  eatDrinkFilters: Array<IEatDrinkFilter>,
  venueTypeFilters: Array<IVenueTypeFilter>,
): Array<IVenue> => {
  let result = [];
  const categories = buildSearchString(eatDrinkFilters, venueTypeFilters);

  if (categories) {
    result = foursquareApiSearch(categories, latitude, longitude);
  }

  return result;
};

export const getNearbyPlaces = new ValidatedMethod({
  name: "getNearbyPlaces",

  // NOTE: ValidatedMethods automatically throw a ValidationError for invalid schemas
  validate: new SimpleSchema({
    latitude: { type: Number },
    longitude: { type: Number },
    eatDrinkFilters: { type: Array },
    "eatDrinkFilters.$": { type: Object },
    "eatDrinkFilters.$.id": { type: String },
    "eatDrinkFilters.$.name": { type: String },
    "eatDrinkFilters.$.on": { type: Boolean },
    "eatDrinkFilters.$.foursquareCategory": { type: String },
    venueTypeFilters: { type: Array },
    "venueTypeFilters.$": { type: Object },
    "venueTypeFilters.$.id": { type: String },
    "venueTypeFilters.$.name": { type: String },
    "venueTypeFilters.$.on": { type: Boolean },
    "venueTypeFilters.$.foursquareCategory": { type: String },
  }).validator(),

  // eslint-disable-next-line flowtype/require-parameter-type
  run({ latitude, longitude, eatDrinkFilters, venueTypeFilters }): Array<IVenue> {
    // TODO use unblock? (if so, confirm `meteor test` still passes)
    // if (Meteor.isServer) {
    //   this.unblock();
    // }
    return collectSearchResults(latitude, longitude, eatDrinkFilters, venueTypeFilters);
  },
});
