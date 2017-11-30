// Hand creating google-map-react libdef
declare module "google-map-react" {
  declare type IBootstrapURLKeys = {
    key: string;
  };

  declare export type ILatLng = {
    lat: number,
    lng: number,
  };

  declare type IBounds = {
    ne: ILatLng,
    nw: ILatLng,
    se: ILatLng,
    sw: ILatLng,
  };

  declare export type IGoogleMapDisplay = {
    bounds: IBounds,
    center: ILatLng,
    marginBounds: IBounds,
    size: {
      width: number,
      height: number,
    },
    zoom: number,
  };

  declare export type IGoogleMapsMouseEvent = {
    x: number,
    y: number,
    lat: number,
    lng: number,
    event: Object,   // event Proxy (not sure of actual type)
  };

  declare type GoogleMapProps = {
    bootstrapURLKeys: IBootstrapURLKeys,
    defaultCenter?: ILatLng,
    defaultZoom?: number,
  };

  declare export default class GoogleMap extends React$Component {
    props: GoogleMapProps;
  }
}
