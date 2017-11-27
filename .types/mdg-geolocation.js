// NOTE: the mdg:geolocation package exposes Geolocation on the client
declare var Geolocation: {
  error(): ?PositionError,
  currentLocation(): ?Position,
  latLng(): ?{
    lat: number,
    lng: number,
  }
}
