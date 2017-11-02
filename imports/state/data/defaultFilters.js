// @flow
import type { IFilter } from "../reducers/filtersReducers";

export const EAT_DRINK_FILTERS: Array<IFilter> = [
  {
    id: "vegan",
    name: "Vegan",
    on: true,
    foursquareCategory: "52f2ab2ebcbc57f1066b8b1c",
  },
  {
    id: "vegetarian",
    name: "Vegetarian",
    on: true,
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
    foursquareCategory: "52f2ab2ebcbc57f1066b8b45",
  },
  {
    id: "juice",
    name: "Juice",
    on: true,
    foursquareCategory: "4bf58dd8d48988d112941735",
  },
  {
    id: "supplements",
    name: "Supplements",
    on: false,
    foursquareCategory: "5744ccdfe4b0c0459246b4cd",
  },
];

export const VENUE_FILTERS: Array<IFilter> = [
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
    on: true,
    foursquareCategory: "4bf58dd8d48988d112941735",
  },
  {
    id: "healthFoodStore",
    name: "Health Food Store",
    on: false,
    foursquareCategory: "50aa9e744b90af0d42d5de0e",
  },
];

const DEFAULT_FILTER_LIST: Array<IFilter> = [
  {
    id: "juiceBar",
    name: "Juice Bars",
    on: true,
    foursquareCategory: "4bf58dd8d48988d112941735",
  },
  {
    id: "veganVegRestaurant",
    name: "Vegan / Vegetarian",
    on: true,
    foursquareCategory: "4bf58dd8d48988d1d3941735",
  },
  {
    id: "glutenFree",
    name: "Gluten Free",
    on: false,
    foursquareCategory: "4c2cd86ed066bed06c3c5209",
  },
  {
    id: "saladPlace",
    name: "Salad Places",
    on: false,
    foursquareCategory: "4bf58dd8d48988d1bd941735",
  },
  {
    id: "bakery",
    name: "Bakeries",
    on: false,
    foursquareCategory: "4bf58dd8d48988d16a941735",
  },
  {
    id: "cafe",
    name: "Cafés",
    on: false,
    foursquareCategory: "4bf58dd8d48988d16d941735",
  },
  {
    id: "coffeeShop",
    name: "Coffee Shops",
    on: false,
    foursquareCategory: "4bf58dd8d48988d1e0931735",
  },
  {
    id: "restaurant",
    name: "Restaurants",
    on: false,
    foursquareCategory: "4bf58dd8d48988d1c4941735",
  },
  {
    id: "farmersMarket",
    name: "Farmers Markets",
    on: false,
    foursquareCategory: "4bf58dd8d48988d1fa941735",
  },
  {
    id: "healthFoodStore",
    name: "Health Food Stores",
    on: false,
    foursquareCategory: "50aa9e744b90af0d42d5de0e",
  },
  {
    id: "organicGrocery",
    name: "Organic Grocery Stores",
    on: false,
    foursquareCategory: "52f2ab2ebcbc57f1066b8b45",
  },
  {
    id: "grocery",
    name: "Grocery Stores",
    on: false,
    foursquareCategory: "4bf58dd8d48988d118951735",
  },
  {
    id: "supermarket",
    name: "Supermarkets",
    on: false,
    foursquareCategory: "52f2ab2ebcbc57f1066b8b46",
  },
  {
    id: "fruitVegStore",
    name: "Fruit & Vegetable Stores",
    on: false,
    foursquareCategory: "52f2ab2ebcbc57f1066b8b1c",
  },
  {
    id: "market",
    name: "Markets",
    on: false,
    foursquareCategory: "50be8ee891d4fa8dcc7199a7",
  },
];

export default DEFAULT_FILTER_LIST;
