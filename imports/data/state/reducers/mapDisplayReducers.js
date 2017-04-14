// @flow
import { SET_SELECTED_VENUE } from "../actions/actionTypes";
import type { IMapDisplayAction } from "../actions/mapDisplayActions";

export type IMapDisplayState = {
  selectedVenueId: ?string,
};

export const defaultMapDisplayState = {
  selectedVenueId: null,
};

const mapDisplay = (
  state: IMapDisplayState = defaultMapDisplayState,
  action: IMapDisplayAction,
): IMapDisplayState => {
  switch (action.type) {
    case SET_SELECTED_VENUE:
      return { selectedVenueId: action.venueId };

    default:
      return state;
  }
};

export default mapDisplay;
