// @flow
import type { IViewArea } from "../ui/components/LocationsMap";

const calcHintPosition = (
  hintViewArea: ?IViewArea,
  hintArea: ?IViewArea,
): string => {
  let hintPos = "hint--bottom";

  if (hintViewArea && hintArea) {
    const fitsTop = hintArea.top > hintViewArea.top;
    const fitsRight = hintArea.right < hintViewArea.right;
    const fitsBottom = hintArea.bottom < hintViewArea.bottom;
    const fitsLeft = hintArea.left > hintViewArea.left;

    const fitsAnywhere = fitsTop && fitsRight && fitsBottom && fitsLeft;
    const fitsNowhere = !fitsTop && !fitsRight && !fitsBottom && !fitsLeft;

    if (!fitsAnywhere && !fitsNowhere) {
      if (!fitsBottom && fitsTop) {
        hintPos = "hint--top";
      }

      if (!fitsLeft && fitsRight) {
        hintPos += "-right";
      } else if (!fitsRight && fitsLeft) {
        hintPos += "-left";
      }
    }
  }

  return hintPos;
};

export default calcHintPosition;
