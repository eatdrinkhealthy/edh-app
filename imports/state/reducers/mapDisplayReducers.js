// @flow
import type { ILatLng } from "google-map-react";
import {
  SET_SELECTED_VENUE,
  SET_USER_LOCATION,
  SET_MAP_CENTER,
  SET_MAP_ZOOM,
} from "../actions/actionTypes";
import type { IMapDisplayAction } from "../actions/mapDisplayActions";

export type IMapDisplayState = {
  selectedVenueId: ?string,
  userLocation: ?ILatLng,
  mapCenter: ILatLng,
  zoom: number,
};

export const defaultMapDisplayState = {
  selectedVenueId: null,
  userLocation: null,
  mapCenter: {          // Charleston, SC
    lat: 32.789008,
    lng: -79.932115,
  },
  zoom: 3,
};

const mapDisplay = (
  state: IMapDisplayState = defaultMapDisplayState,
  action: IMapDisplayAction,
): IMapDisplayState => {
  switch (action.type) {
    case SET_SELECTED_VENUE:
      return Object.assign({}, state, { selectedVenueId: action.venueId });

    case SET_USER_LOCATION:
      return Object.assign({}, state, { userLocation: action.userLocation });

    case SET_MAP_CENTER:
      return Object.assign({}, state, { mapCenter: action.mapCenter });

    case SET_MAP_ZOOM:
      return Object.assign({}, state, { zoom: action.zoom });

    default:
      return state;
  }
};

export default mapDisplay;
