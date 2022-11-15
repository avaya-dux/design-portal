import { act, renderHook } from "@testing-library/react";

import { useOsName, useWindowSize } from "./hooks";

describe("custom hooks", () => {
  describe("useOsName", () => {
    it("returns the correct value when user agent string is macos", () => {
      Object.defineProperty(window.navigator, "userAgent", {
        get: function () {
          return "macos";
        },
        configurable: true,
      });

      const { result } = renderHook(useOsName);

      expect(result.current).toBe("macos");
    });

    it("returns the correct value when user agent string is not macos", () => {
      Object.defineProperty(window.navigator, "userAgent", {
        get: function () {
          return "linux";
        },
      });

      const { result } = renderHook(useOsName);

      expect(result.current).toBe("windows");
    });
  });

  describe("useWindowSize", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 500,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 900,
      writable: true,
      configurable: true,
    });

    it("returns the correct values when reading innerWidth and innerHeight of window", () => {
      const { result } = renderHook(useWindowSize);

      expect(result.current.width).toBe(500);
      expect(result.current.height).toBe(900);
    });

    it("updates correctly when window is resized", () => {
      const { result } = renderHook(useWindowSize);

      expect(result.current.width).toBe(500);
      expect(result.current.height).toBe(900);

      act(() => {
        window.innerWidth = 1000;
        window.innerHeight = 1000;

        window.dispatchEvent(new Event("resize"));
      });

      expect(result.current.width).toBe(1000);
      expect(result.current.height).toBe(1000);
    });
  });
});
