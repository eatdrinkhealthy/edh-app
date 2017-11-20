// @flow
import type { IEatDrinkFilter } from "../reducers/eatDrinkFiltersReducers";
import type { IVenueTypeFilter } from "../reducers/venueTypeFiltersReducers";

export const EAT_DRINK_FILTERS: Array<IEatDrinkFilter> = [
  {
    id: "vegan",
    name: "Vegan",
    on: false,
    foursquareCategory: "52f2ab2ebcbc57f1066b8b1c",
  },
  {
    id: "vegetarian",
    name: "Vegetarian",
    on: false,
    foursquareCategory: "4bf58dd8d48988d1d3941735",
  },
  {
    id: "glutenFree",
    name: "Gluten Free",
    on: false,
    foursquareCategory: "4c2cd86ed066bed06c3c5209",
  },
  {
    id: "rawFood",
    name: "Raw Food",
    on: false,
    foursquareCategory: "52f2ab2ebcbc57f1066b8b1c",
  },
  {
    id: "juice",
    name: "Juice",
    on: false,
    foursquareCategory: "4bf58dd8d48988d1bd941735",
  },
  {
    id: "supplements",
    name: "Supplements",
    on: false,
    foursquareCategory: "5744ccdfe4b0c0459246b4cd",
  },
];

export const VENUE_TYPE_FILTERS: Array<IVenueTypeFilter> = [
  {
    id: "restaurant",
    name: "Restaurant / Cafe",
    on: false,
    foursquareCategory: "4bf58dd8d48988d1c4941735",
  },
  {
    id: "grocery",
    name: "Market / Store",
    on: false,
    foursquareCategory: "4bf58dd8d48988d118951735",
  },
  {
    id: "coffeeShop",
    name: "Coffee Shop",
    on: false,
    foursquareCategory: "4bf58dd8d48988d1e0931735",
  },
  {
    id: "bakery",
    name: "Bakery",
    on: false,
    foursquareCategory: "4bf58dd8d48988d16a941735",
  },
  {
    id: "juiceBar",
    name: "Juice Bar",
    on: false,
    foursquareCategory: "4bf58dd8d48988d112941735",
  },
  {
    id: "healthFoodStore",
    name: "Health Food Store",
    on: false,
    foursquareCategory: "50aa9e744b90af0d42d5de0e",
  },
];
