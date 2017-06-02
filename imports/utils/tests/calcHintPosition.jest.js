// @flow
/* eslint-env jest */
/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import calcHintPosition from "../calcHintPosition";

describe("calcHintPosition", function () {
  it("should return 'hint--bottom' if first param, hintViewArea, is null", function () {
    expect(calcHintPosition(null)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom' if second param, hintArea, is null", function () {
    expect(calcHintPosition({ top: 0, right: 0, bottom: 0, left: 0 }, null)).toBe("hint--bottom");
  });

  it("should return 'hint--top' if hint bottom >= hint view bottom, and fits on top", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 120, bottom: 601, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--top");
  });

  it("should return 'hint--bottom' if hint bottom >= hint view bottom, and doesn't fit top", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 9, right: 120, bottom: 601, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom");
  });

  it("should return 'hint--left' if hint right >= hint view right, and fits left", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 601, bottom: 80, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--left");
  });

  it("should return 'hint--bottom' if hint right is past hint view right, and doesn't fit left", function () {
    const hintViewArea = { top: 10, right: 110, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 120, bottom: 80, left: 20 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom");
  });

  it("should return 'hint--right' if hint left is past hint view left, and fits right", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 120, bottom: 80, left: 5 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--right");
  });

  it("should return 'hint--bottom' if hint left is past hint view left, and doesn't fit right", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 120, bottom: 80, left: 5 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom' if hint top is past hint view top, and fits bottom", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 120, bottom: 80, left: 5 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom");
  });

  it("should return 'hint--bottom' if hint top is past hint view top, and DOESN'T fit bottom", function () {
    const hintViewArea = { top: 10, right: 600, bottom: 600, left: 10 };
    const hintArea = { top: 20, right: 120, bottom: 80, left: 5 };

    expect(calcHintPosition(hintViewArea, hintArea)).toBe("hint--bottom");
  });
});
