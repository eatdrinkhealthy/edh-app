// @flow
import React, {
  PureComponent,
} from "react";

const MARKER_WIDTH = 40;
const MARKER_HEIGHT = 40;

const markerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it"s on you to set object origin to 0,0 coordinates
  position: "absolute",
  width: MARKER_WIDTH,
  height: MARKER_HEIGHT,
  left: -MARKER_WIDTH / 2,
  top: -MARKER_HEIGHT / 2,

  border: "5px solid #f44336",
  borderRadius: MARKER_HEIGHT,
  backgroundColor: "white",
  textAlign: "center",
  color: "#3f51b5",
  fontSize: 16,
  fontWeight: "bold",
  padding: 4,
};

type IMarker = {
  text: string,
};

// eslint-disable-next-line react/prefer-stateless-function
class Marker extends PureComponent {
  static defaultProps = {};

  props: IMarker;

  render() {
    return (
      <div style={markerStyle}>
        {this.props.text}
      </div>
    );
  }
}

export default Marker;
