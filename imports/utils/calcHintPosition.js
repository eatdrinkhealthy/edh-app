// @flow
import type { IViewArea } from "../ui/components/LocationsMap";

const calcHintPosition = (
  hintViewArea: ?IViewArea,
  markerRect: ClientRect,
  hintWidth: number,
  hintHeight: number,
): string => {
  let hintPos = "hint--bottom";

  if (hintViewArea) {
    /* eslint-disable no-bitwise */
    let fitsBitmap = 0;
    const TOP = 8;
    const RIGHT = 4;
    const BOTTOM = 2;
    const LEFT = 1;

    const markerCenter = markerRect.left + (markerRect.width / 2);

    if (markerRect.top - hintHeight > hintViewArea.top) { fitsBitmap |= TOP; }
    if (markerCenter + (hintWidth / 2) < hintViewArea.right) { fitsBitmap |= RIGHT; }
    if (markerRect.bottom + hintHeight < hintViewArea.bottom) { fitsBitmap |= BOTTOM; }
    if (markerCenter - (hintWidth / 2) > hintViewArea.left) { fitsBitmap |= LEFT; }

    switch (fitsBitmap) {
      case LEFT:
        hintPos = "hint--left";
        break;

      case RIGHT:
      case RIGHT | LEFT:
        hintPos = "hint--right";
        break;

      case BOTTOM | LEFT:
        hintPos = "hint--bottom-left";
        break;

      case TOP | BOTTOM | LEFT:
        hintPos = "hint--left";
        break;

      case RIGHT | BOTTOM:
        hintPos = "hint--bottom-right";
        break;

      case TOP | RIGHT | BOTTOM:
        hintPos = "hint--right";
        break;

      case TOP:
      case TOP | RIGHT | LEFT:
        hintPos = "hint--top";
        break;

      case TOP | LEFT:
        hintPos = "hint--top-left";
        break;

      case TOP | RIGHT:
        hintPos = "hint--top-right";
        break;

      default:
        // all other locations, "hint--bottom"
        break;
    }
    /* eslint-enable no-bitwise */
  }

  return hintPos;
};

export default calcHintPosition;
