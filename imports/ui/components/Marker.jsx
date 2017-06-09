// @flow
import React, {
  PureComponent,
} from "react";
import classNames from "classnames";
import { calcHintPosition } from "../../utils/calcHintPosition";

import type { IVenue } from "../../data/state/reducers/searchResultsReducers";
import type { IViewArea } from "./LocationsMap";

type IMarkerOrigin = "center" | "topLeft" | "bottomCenter";

class Marker extends PureComponent {
  props: {
    venue: IVenue,
    origin?: IMarkerOrigin,
    selected?: boolean,
    setSelectedVenueHandler: (venueId: string) => void,
    getHintViewArea?: () => IViewArea,
  };

  static defaultProps = {
    origin: "bottomCenter",
    selected: false,
  };

  state = {
    hintPosition: "hint--bottom",
  };

  setHintHolderRef = (div: HTMLDivElement) => {
    this.hintHolder = div;
  }

  setMarkerHolderRef = (div: HTMLDivElement) => {
    this.markerHolder = div;
  }

  handleOnClick = () => {
    this.props.setSelectedVenueHandler(this.props.venue.id);

    const hintViewArea = this.props.getHintViewArea ? this.props.getHintViewArea() : null;

    const {
      paddingBottom: hintPaddingBottom,
      paddingTop: hintPaddingTop,
      paddingLeft: hintPaddingLeft,
      paddingRight: hintPaddingRight,
    } = window.getComputedStyle(this.hintHolder, null);  // TODO (TBD) confirm px, else convert

    this.setState({
      hintPosition: calcHintPosition(
        hintViewArea,
        this.markerHolder.getBoundingClientRect(),
        this.hintHolder.getBoundingClientRect().width,
        this.hintHolder.getBoundingClientRect().height,
        parseInt(hintPaddingTop, 10),
        parseInt(hintPaddingRight, 10),
        parseInt(hintPaddingBottom, 10),
        parseInt(hintPaddingLeft, 10),
      ),
    });
  }

  hintHolder: HTMLDivElement;

  markerHolder: HTMLDivElement;

  render() {  // eslint-disable-line flowtype/require-return-type
    const markerContainerClasses = classNames(
      "markerContainer",
      "hint--color-white-override",
      "hint--html",
      "hint--info",
      this.state.hintPosition,
      this.props.selected ? "hint--always" : "hint--hidden",
      {
        markerOriginCenter: this.props.origin === "center",
        markerOriginTopLeft: this.props.origin === "topLeft",
        markerOriginBottomCenter: this.props.origin === "bottomCenter",
      },
    );

    const markerImage = this.props.selected
      ? "/images/map_marker_selected.svg"
      : "/images/map_marker_unselected.svg";

    const hintClasses = classNames(
      "hint__content",
      "hintContainer",
    );

    const venue = this.props.venue;

    const altStr = `${venue.name} map marker`;

    return (
      <div
        className={markerContainerClasses}
        ref={this.setMarkerHolderRef}
        onClick={this.handleOnClick}
      >
        <img src={markerImage} alt={altStr} />
        <div
          className={hintClasses}
          ref={this.setHintHolderRef}
        >
          <div className="hint-venue-name">{venue.name}</div>
          <div className="hint-venue-address">{venue.location.address}</div>
          <div className="hint-venue-category">{venue.primaryCategory}</div>
        </div>
      </div>
    );
  }
}

export default Marker;
