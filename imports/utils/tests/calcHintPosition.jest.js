//  intentionally not flow checking this file
//      (Flow incorrectly throws error on ClientRect being incompatible type)
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import {
  calcHintPosition,
  fitLocationsBitmap,
  TOP,
  TOP_LEFT,
  TOP_RIGHT,
  BOTTOM,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  RIGHT,
  LEFT,
} from "../calcHintPosition";

const markerRect = { top: 100, right: 250, bottom: 150, left: 200, height: 50, width: 50 };

const hintSpacing = {
  width: 150,
  height: 50,
  paddingRight: 10,
  paddingBottom: 10,
  paddingLeft: 10,
};

// When setting the values of the hintAreaView for testing
// it is easiest to first assign which boundary you need
// then add whether it fits or not for that property

const TOP_BOUNDARY = 50;
const MIDDLE_BOUNDARY = 65;
const BOTTOM_BOUNDARY = 200;

const LEFT_BOUNDARY = 50;
const LEFT_CENTER_BOUNDARY = 85;   // fully centered does fit

const CENTER_LEFTSIDE_BOUNDARY = 150;   // fully centered does fit
const CENTER_RIGHTSIDE_BOUNDARY = 300;   // fully centered does fit

const RIGHT_CENTER_BOUNDARY = 365;  // fully centered does fit
const RIGHT_BOUNDARY = 400;

const FIT_TOP_YES = -5;
const FIT_TOP_NO = 5;
const FIT_RIGHT_YES = 5;
const FIT_RIGHT_NO = -5;
const FIT_BOTTOM_YES = 5;
const FIT_BOTTOM_NO = -5;
const FIT_LEFT_YES = -5;
const FIT_LEFT_NO = 5;

describe("calcHintPosition helpers", function () {
  describe("fitLocationsBitmap", function () {
    it("should return TOP when hint fits only at top", function () {
      const hintViewArea = {
        top: TOP_BOUNDARY + FIT_TOP_YES,
        right: RIGHT_CENTER_BOUNDARY + FIT_RIGHT_NO,
        bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
        left: LEFT_CENTER_BOUNDARY + FIT_LEFT_NO,
      };

      expect(fitLocationsBitmap(hintViewArea, markerRect, hintSpacing)).toBe(TOP);
    });

    it("should return TOP_LEFT when hint fits only at top left", function () {
      const hintViewArea = {
        top: TOP_BOUNDARY + FIT_TOP_YES,
        right: CENTER_RIGHTSIDE_BOUNDARY + FIT_RIGHT_NO,
        bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
        left: LEFT_CENTER_BOUNDARY + FIT_LEFT_YES,
      };

      expect(fitLocationsBitmap(hintViewArea, markerRect, hintSpacing)).toBe(TOP_LEFT);
    });

    it("should return TOP_RIGHT when hint fits only at top right", function () {
      const hintViewArea = {
        top: TOP_BOUNDARY + FIT_TOP_YES,
        right: RIGHT_CENTER_BOUNDARY + FIT_RIGHT_YES,
        bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
        left: CENTER_LEFTSIDE_BOUNDARY + FIT_LEFT_NO,
      };

      expect(fitLocationsBitmap(hintViewArea, markerRect, hintSpacing)).toBe(TOP_RIGHT);
    });

    it("should return RIGHT when hint fits only at right", function () {
      const hintViewArea = {
        top: TOP_BOUNDARY + FIT_TOP_NO,
        right: RIGHT_BOUNDARY + FIT_RIGHT_YES,
        bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
        left: CENTER_LEFTSIDE_BOUNDARY + FIT_LEFT_NO,
      };

      expect(fitLocationsBitmap(hintViewArea, markerRect, hintSpacing)).toBe(RIGHT);
    });

    it("should return LEFT when hint fits only at left", function () {
      const hintViewArea = {
        top: TOP_BOUNDARY + FIT_TOP_NO,
        right: CENTER_RIGHTSIDE_BOUNDARY + FIT_RIGHT_NO,
        bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
        left: LEFT_BOUNDARY + FIT_LEFT_YES,
      };

      expect(fitLocationsBitmap(hintViewArea, markerRect, hintSpacing)).toBe(LEFT);
    });

    it("should return BOTTOM when hint fits only at bottom", function () {
      const hintViewArea = {
        top: MIDDLE_BOUNDARY + FIT_TOP_NO,
        right: RIGHT_CENTER_BOUNDARY + FIT_RIGHT_NO,
        bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_YES,
        left: LEFT_CENTER_BOUNDARY + FIT_LEFT_NO,
      };

      expect(fitLocationsBitmap(hintViewArea, markerRect, hintSpacing)).toBe(BOTTOM);
    });

    it("should return BOTTOM_LEFT when hint fits only at bottom left", function () {
      const hintViewArea = {
        top: MIDDLE_BOUNDARY + FIT_TOP_NO,
        right: CENTER_RIGHTSIDE_BOUNDARY + FIT_RIGHT_NO,
        bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_YES,
        left: LEFT_CENTER_BOUNDARY + FIT_LEFT_YES,
      };

      expect(fitLocationsBitmap(hintViewArea, markerRect, hintSpacing)).toBe(BOTTOM_LEFT);
    });

    it("should return BOTTOM_RIGHT when hint fits only at bottom right", function () {
      const hintViewArea = {
        top: MIDDLE_BOUNDARY + FIT_TOP_NO,
        right: RIGHT_CENTER_BOUNDARY + FIT_RIGHT_YES,
        bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_YES,
        left: CENTER_LEFTSIDE_BOUNDARY + FIT_LEFT_NO,
      };

      expect(fitLocationsBitmap(hintViewArea, markerRect, hintSpacing)).toBe(BOTTOM_RIGHT);
    });
  });
});

describe("calcHintPosition in relation to Marker", function () {
  it("should return 'hint--bottom' if first param, hintViewArea, is null", function () {
    expect(calcHintPosition(null, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom' when fits top NO, right NO, bottom NO, left NO", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_NO,
      right: CENTER_RIGHTSIDE_BOUNDARY + FIT_RIGHT_NO,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
      left: CENTER_LEFTSIDE_BOUNDARY + FIT_LEFT_NO,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--left' when fits top NO, right NO, bottom NO, left YES", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_NO,
      right: CENTER_RIGHTSIDE_BOUNDARY + FIT_RIGHT_NO,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
      left: LEFT_BOUNDARY + FIT_LEFT_YES,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--left");
  });

  it("should return 'hint--bottom' when fits top NO, right NO, bottom YES, left NO", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_NO,
      right: RIGHT_CENTER_BOUNDARY + FIT_RIGHT_NO,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_YES,
      left: LEFT_CENTER_BOUNDARY + FIT_LEFT_NO,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom-left' when fits top NO, right NO, bottom_left YES", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_NO,
      right: CENTER_RIGHTSIDE_BOUNDARY + FIT_RIGHT_NO,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_YES,
      left: LEFT_BOUNDARY + FIT_LEFT_YES,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom-left");
  });

  it("should return 'hint--right' when fits top NO, right YES, bottom NO, left NO", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_NO,
      right: RIGHT_BOUNDARY + FIT_RIGHT_YES,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
      left: LEFT_BOUNDARY + FIT_LEFT_YES,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--right");
  });

  it("should return 'hint--right' when fits top NO, right YES, bottom NO, left YES", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_NO,
      right: RIGHT_BOUNDARY + FIT_RIGHT_YES,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
      left: LEFT_BOUNDARY + FIT_LEFT_YES,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--right");
  });

  it("should return 'hint--bottom-right' when fits top NO, bottom_right YES, left NO", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_NO,
      right: RIGHT_BOUNDARY + FIT_RIGHT_YES,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_YES,
      left: CENTER_LEFTSIDE_BOUNDARY + FIT_LEFT_NO,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom-right");
  });

  it("should return 'hint--bottom' when fits top NO, right YES, bottom YES, left YES", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_NO,
      right: RIGHT_BOUNDARY + FIT_RIGHT_YES,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_YES,
      left: LEFT_BOUNDARY + FIT_LEFT_YES,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--top' when fits top YES, right NO, bottom NO, left NO", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_YES,
      right: RIGHT_BOUNDARY + FIT_RIGHT_NO,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
      left: LEFT_BOUNDARY + FIT_LEFT_NO,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--top");
  });

  it("should return 'hint--top-left' when fits top YES, right NO, bottom NO, left YES", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_YES,
      right: CENTER_RIGHTSIDE_BOUNDARY + FIT_RIGHT_NO,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
      left: LEFT_BOUNDARY + FIT_LEFT_YES,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--top-left");
  });

  it("should return 'hint--bottom' when fits top YES, right NO, bottom YES, left NO", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_YES,
      right: RIGHT_BOUNDARY + FIT_RIGHT_NO,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_YES,
      left: LEFT_BOUNDARY + FIT_LEFT_NO,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom' when fits top YES, right NO, bottom YES, left YES", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_YES,
      right: RIGHT_BOUNDARY + FIT_RIGHT_NO,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_YES,
      left: LEFT_BOUNDARY + FIT_LEFT_YES,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--top-right' when fits top YES, right YES, bottom NO, left NO", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_YES,
      right: RIGHT_BOUNDARY + FIT_RIGHT_YES,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
      left: CENTER_LEFTSIDE_BOUNDARY + FIT_LEFT_NO,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--top-right");
  });

  it("should return 'hint--top' when fits top YES, right YES, bottom NO, left YES", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_YES,
      right: RIGHT_BOUNDARY + FIT_RIGHT_YES,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_NO,
      left: LEFT_BOUNDARY + FIT_LEFT_YES,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--top");
  });

  it("should return 'hint--bottom' when fits top YES, right YES, bottom YES, left NO", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_YES,
      right: RIGHT_BOUNDARY + FIT_RIGHT_YES,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_YES,
      left: LEFT_BOUNDARY + FIT_LEFT_NO,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom' when fits top YES, right YES, bottom YES, left YES", function () {
    const hintViewArea = {
      top: TOP_BOUNDARY + FIT_TOP_YES,
      right: RIGHT_BOUNDARY + FIT_RIGHT_YES,
      bottom: BOTTOM_BOUNDARY + FIT_BOTTOM_YES,
      left: LEFT_BOUNDARY + FIT_LEFT_YES,
    };

    expect(calcHintPosition(hintViewArea, markerRect, hintSpacing)).toBe("hint--bottom");
  });
});
