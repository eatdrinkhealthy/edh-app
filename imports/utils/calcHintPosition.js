// @flow
import type { IViewArea } from "../ui/components/LocationsMap";

const calcHintPosition = (
  hintViewArea: ?IViewArea,
  hintArea: ?IViewArea,
): string => {
  let hintPos = "hint--bottom";

  if (hintViewArea && hintArea) {
    hintPos = "hint--top";
  }
  return hintPos;
};

export default calcHintPosition;
