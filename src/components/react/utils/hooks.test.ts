import { renderHook } from "@testing-library/react";

import { useOsName } from "./hooks";

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
});
