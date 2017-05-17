// Hand creating google-map-react libdef
declare module "google-map-react" {
  declare type IBootstrapURLKeys = {
    key: string;
  };

  declare export type ILatLng = {
    lat: number,
    lng: number,
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
