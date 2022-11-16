import { vi } from "vitest";

import { disableScrollOnMobile } from "./helpers";

describe("disableScroll", () => {
  const spyScroll = vi.fn();
  Object.defineProperty(window, "scroll", { value: spyScroll });

  it("fires the correct event when the appropiate values are passed in", () => {
    disableScrollOnMobile(true, 320, 799);

    expect(window.scroll).toHaveBeenCalled();
  });

  it("does not fire when the appropiate values are passed in", () => {
    disableScrollOnMobile(false, 320, 799);

    expect(window.scroll).not.toHaveBeenCalledTimes(2);
  });
});
