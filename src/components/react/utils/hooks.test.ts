import { act, fireEvent, renderHook } from "@testing-library/react";

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
    // mocking window resize event
    // reference https://alexboffey.co.uk/blog/jest-window-mock/
    const customGlobal: any = global;

    customGlobal.innerWidth = 500;
    customGlobal.innerHeight = 900;

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
        customGlobal.innerWidth = 1000;
        customGlobal.innerHeight = 1000;

        fireEvent(customGlobal, new Event("resize"));
      });

      expect(result.current.width).toBe(1000);
      expect(result.current.height).toBe(1000);
    });
  });
});
