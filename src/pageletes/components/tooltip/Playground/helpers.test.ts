import { shouldDisableOffset } from "./helpers";

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
