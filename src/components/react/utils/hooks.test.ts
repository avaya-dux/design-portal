import { renderHook } from "@testing-library/react";
import { useOsName } from "./hooks";

describe("custom hooks", () => {
  describe("useOsName", () => {
    it("returns the correct value when user agent string is macos", () => {

      (<any>navigator)["__defineGetter__"]("userAgent", function () {
        return "macos";
      });

      const { result } = renderHook(() => useOsName());

      expect(result.current).toBe("macos");
    });

    it("returns the correct value when user agent string is not macos", () => {

      (<any>navigator)["__defineGetter__"]("userAgent", function () {
        return "linux";
      });

      const { result } = renderHook(() => useOsName());

      expect(result.current).toBe("windows");
    });
  });
});
