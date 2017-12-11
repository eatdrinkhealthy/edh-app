// @flow
import type { ILatLng } from "google-map-react";
import {
  SET_SELECTED_VENUE,
  SET_USER_LOCATION,
  SET_MAP_CENTER,
  SET_MAP_ZOOM,
} from "./actionTypes";

export type IMapDisplayAction = {
  type: string,
  venueId?: ?string,
  userLocation?: ?ILatLng,
  mapCenter?: ILatLng,
  zoom?: number,
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

export const setMapZoom = (
  zoom: number,
) => ({
  type: SET_MAP_ZOOM,
  zoom,
});
