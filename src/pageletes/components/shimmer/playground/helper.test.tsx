import { createHtmlString, createReactString } from "./helper";

describe("helper functions", () => {
  describe("createHtmlString", () => {
    it("should have correct output", () => {
      expect(createHtmlString(true, "rectangle", "md")).toMatchInlineSnapshot(`
        "<div
          aria-busy="true"
          aria-live="polite"
          role="alert"
          class="neo-shimmer neo-shimmer__rectangle"
        >
        </div>"
      `);
    });
  });
  describe("createReactString", () => {
    it("should have correct output", () => {
      expect(createReactString(true, "rectangle", "md")).toMatchInlineSnapshot(
        '"<Shimmer loopInfinitely />"',
      );
    });
  });
});
