// @flow
import { TOGGLE_VENUE_TYPE_FILTER } from "./actionTypes";

export type IVenueTypeFilterAction = {
  type: string,
  id: string,
};

// eslint-disable-next-line import/prefer-default-export
export const toggleVenueTypeFilter = (id: string): IVenueTypeFilterAction => ({
  type: TOGGLE_VENUE_TYPE_FILTER,
  id,
});
