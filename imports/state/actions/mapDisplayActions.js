// @flow
import type { ILatLng } from "google-map-react";
import {
  SET_SELECTED_VENUE,
  SET_USER_LOCATION,
  SET_MAP_CENTER,
} from "./actionTypes";

export type IMapDisplayAction = {
  type: string,
  venueId?: ?string,
  userLocation?: ?ILatLng,
  mapCenter?: ILatLng,
};

// eslint-disable-next-line import/prefer-default-export
export const setSelectedVenue = (
  venueId: ?string,
): IMapDisplayAction => ({
  type: SET_SELECTED_VENUE,
  venueId,
});

export const setUserLocation = (
  userLocation: ?ILatLng,
) => ({
  type: SET_USER_LOCATION,
  userLocation,
});

export const setMapCenter = (
  mapCenter: ILatLng,
) => ({
  type: SET_MAP_CENTER,
  mapCenter,
});
