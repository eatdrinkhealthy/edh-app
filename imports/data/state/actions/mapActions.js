// @flow
import { SET_SELECTED_VENUE } from "./actionTypes";

export type IMapAction = {
  type: string,
  venueId: ?string,
};

// eslint-disable-next-line import/prefer-default-export
export const setSelectedVenue = (
  venueId: ?string,
): IMapAction => ({
  type: SET_SELECTED_VENUE,
  venueId,
});
