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

    hintPos = "hint-";

    if (fitsAnywhere || fitsNowhere) {
      hintPos += "-bottom";
    } else {
      if (fitsBottom) {
        hintPos += "-bottom";
      } else if (fitsTop) {
        hintPos += "-top";
      }

      if (fitsRight) {
        hintPos += "-right";
      } else if (fitsLeft) {
        hintPos += "-left";
      }
    }

    if (hintPos.endsWith("-")) {
      hintPos = "hint--bottom";     // if missed any cases, set to bottom
    }
  }

  return hintPos;
};

export default calcHintPosition;
