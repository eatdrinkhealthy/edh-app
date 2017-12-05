// @flow
import type { ILatLng } from "google-map-react";
import {
  SET_SELECTED_VENUE,
  SET_USER_POSITION,
  SET_MAP_CENTER,
} from "./actionTypes";

export type IMapDisplayAction = {
  type: string,
  venueId?: ?string,
  userPosition?: ?ILatLng,
  mapCenter?: ILatLng,
};

// eslint-disable-next-line import/prefer-default-export
export const setSelectedVenue = (
  venueId: ?string,
): IMapDisplayAction => ({
  type: SET_SELECTED_VENUE,
  venueId,
});

export const setUserPosition = (
  userPosition: ?ILatLng,
) => ({
  type: SET_USER_POSITION,
  userPosition,
});

export const setMapCenter = (
  mapCenter: ILatLng,
) => ({
  type: SET_MAP_CENTER,
  mapCenter,
});
