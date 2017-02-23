// Hand creating google-map-react libdef
import type { ILatLng } from "../imports/config/types";

// TODO confirm (or fix), props typechecking is enforced
type GoogleMap$Props = {
  defaultCenter?: ILatLng,
  defaultZoom?: number,
};

declare module "google-map-react" {
  declare export default class GoogleMap extends React$Component<any, GoogleMap$Props, any> {
    props: GoogleMap$Props;
  }
}
