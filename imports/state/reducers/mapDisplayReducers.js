// @flow
import type { ILatLng } from "google-map-react";
import {
  SET_SELECTED_VENUE,
  SET_USER_POSITION,
} from "../actions/actionTypes";
import type { IMapDisplayAction } from "../actions/mapDisplayActions";

export type IMapDisplayState = {
  selectedVenueId: ?string,
  userPosition: ?ILatLng,
};

export const defaultMapDisplayState = {
  selectedVenueId: null,
  userPosition: null,
};

const mapDisplay = (
  state: IMapDisplayState = defaultMapDisplayState,
  action: IMapDisplayAction,
): IMapDisplayState => {
  switch (action.type) {
    case SET_SELECTED_VENUE:
      return Object.assign({}, state, { selectedVenueId: action.venueId });

    case SET_USER_POSITION:
      return Object.assign({}, state, { userPosition: action.userPosition });

    default:
      return state;
  }
};

export default mapDisplay;
