// @flow
import type { IViewArea } from "../ui/components/LocationsMap";

const calcHintPosition = (
  hintViewArea: ?IViewArea,
  hintArea: ?IViewArea,
): string => {
  let hintPos = "hint--bottom";

  if (hintViewArea && hintArea) {
    /* eslint-disable no-bitwise */
    let fitsBitmap = 0;
    const TOP = 8;
    const RIGHT = 4;
    const BOTTOM = 2;
    const LEFT = 1;

    if (hintArea.top > hintViewArea.top) { fitsBitmap |= TOP; }
    if (hintArea.right < hintViewArea.right) { fitsBitmap |= RIGHT; }
    if (hintArea.bottom < hintViewArea.bottom) { fitsBitmap |= BOTTOM; }
    if (hintArea.left > hintViewArea.left) { fitsBitmap |= LEFT; }

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
