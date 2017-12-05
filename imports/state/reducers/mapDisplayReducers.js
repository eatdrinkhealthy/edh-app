// @flow
import type { ILatLng } from "google-map-react";
import {
  SET_SELECTED_VENUE,
  SET_USER_POSITION,
  SET_MAP_CENTER,
} from "../actions/actionTypes";
import type { IMapDisplayAction } from "../actions/mapDisplayActions";

export type IMapDisplayState = {
  selectedVenueId: ?string,
  userPosition: ?ILatLng,
  mapCenter: ILatLng,
};

export const defaultMapDisplayState = {
  selectedVenueId: null,
  userPosition: null,
  mapCenter: {          // Charleston, SC
    lat: 32.789008,
    lng: -79.932115,
  },
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

    case SET_MAP_CENTER:
      return Object.assign({}, state, { mapCenter: action.mapCenter });

    default:
      return state;
  }
};

export default mapDisplay;
