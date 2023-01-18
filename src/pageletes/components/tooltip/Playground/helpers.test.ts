import type { TooltipPosition } from "@avaya/neo-react";
import { vi } from "vitest";

import {
  convertToPosition,
  shouldDisableOffset,
  translatePositionToCSSName,
} from "./helpers";

describe("shouldDisableOffset", () => {
  it("should return true for left and right", () => {
    expect(shouldDisableOffset("left")).toBe(true);
    expect(shouldDisableOffset("right")).toBe(true);
    expect(shouldDisableOffset("auto")).toBe(true);
  });

  it("should return false for top and bottom", () => {
    expect(shouldDisableOffset("top")).toBe(false);
    expect(shouldDisableOffset("bottom")).toBe(false);
  });
});

describe("convertToPosition", () => {
  it("should return 'auto' and 'up' if passed 'auto' and 'none'", () => {
    expect(convertToPosition("auto", "none")).toEqual([
      "auto",
      "neo-tooltip--up",
    ]);
  });

  it("should return 'left' and 'left' if passed 'left' and 'none'", () => {
    expect(convertToPosition("left", "none")).toEqual([
      "left",
      "neo-tooltip--left",
    ]);
  });

  it("should return 'right' and 'right' if passed 'right' and 'none'", () => {
    expect(convertToPosition("right", "none")).toEqual([
      "right",
      "neo-tooltip--right",
    ]);
  });

  it("should return 'top' and 'up' if passed 'top' and 'none'", () => {
    expect(convertToPosition("top", "none")).toEqual([
      "top",
      "neo-tooltip--up",
    ]);
  });

  it("should return 'top-left' and 'up-left' if passed 'top' and 'left'", () => {
    expect(convertToPosition("top", "left")).toEqual([
      "top-left",
      "neo-tooltip--up-left",
    ]);
  });

  it("should return 'top-right' and 'up-right' if passed 'top' and 'right'", () => {
    expect(convertToPosition("top", "right")).toEqual([
      "top-right",
      "neo-tooltip--up-right",
    ]);
  });

  it("should return 'bottom' and 'down' if passed 'bottom' and 'none'", () => {
    expect(convertToPosition("bottom", "none")).toEqual([
      "bottom",
      "neo-tooltip--down",
    ]);
  });

  it("should return 'bottom-left' and 'down-left' if passed 'bottom' and 'left'", () => {
    expect(convertToPosition("bottom", "left")).toEqual([
      "bottom-left",
      "neo-tooltip--down-left",
    ]);
  });

  it("should return 'bottom-right' and 'down-right' if passed 'bottom' and 'right'", () => {
    expect(convertToPosition("bottom", "right")).toEqual([
      "bottom-right",
      "neo-tooltip--down-right",
    ]);
  });
});

describe("translatePositionToCSSName", () => {
  it("should return 'up' if passed 'top' or 'auto", () => {
    expect(translatePositionToCSSName("top")).toBe("up");
    expect(translatePositionToCSSName("auto")).toBe("up");
  });

  it("should return matching string if passed 'left' or 'right'", () => {
    expect(translatePositionToCSSName("left")).toBe("left");
    expect(translatePositionToCSSName("right")).toBe("right");
  });

  it("should return 'down' if passed 'bottom'", () => {
    expect(translatePositionToCSSName("bottom")).toBe("down");
  });

  it("should return 'up-left' if passed 'top-left'", () => {
    expect(translatePositionToCSSName("top-left")).toBe("up-left");
  });

  it("should return 'up-right' if passed 'top-right'", () => {
    expect(translatePositionToCSSName("top-right")).toBe("up-right");
  });

  it("should return 'down-left' if passed 'bottom-left'", () => {
    expect(translatePositionToCSSName("bottom-left")).toBe("down-left");
  });

  it("should return 'down-right' if passed 'bottom-right'", () => {
    expect(translatePositionToCSSName("bottom-right")).toBe("down-right");
  });

  it("should return 'up' if passed a bad value", () => {
    // ignore tooltip position warning
    vi.spyOn(console, "warn").mockImplementation(() => null);

    expect(translatePositionToCSSName("bad" as TooltipPosition)).toBe("up");
  });
});
