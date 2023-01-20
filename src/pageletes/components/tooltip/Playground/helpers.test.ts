import type { TooltipPosition } from "@avaya/neo-react";
import { vi } from "vitest";

import { translatePositionToCSSName, upperCaseFirstLetter } from "./helpers";

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

describe("upperCaseFirstLetter", () => {
  it("should return the string with the first letter uppercased", () => {
    expect(upperCaseFirstLetter("hello friend")).toBe("Hello friend");
  });
});
