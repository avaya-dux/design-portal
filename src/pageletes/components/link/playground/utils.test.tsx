import { createReactCode, createHtmlCode } from "./utils";

describe(createHtmlCode.name, () => {
  describe("standalone link html tests", () => {
    it("when enabled", () => {
      expect(createHtmlCode("standalone", false)).toMatchInlineSnapshot(
        '"<a class=\\"neo-link\\" href=\\"#main\\">Link</a>"',
      );
    });

    it("when disabled", () => {
      expect(createHtmlCode("standalone", true)).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__disabled\\" href=\\"#main\\">Link</a>"',
      );
    });
  });

  describe("inline link html tests", () => {
    it("when enabled", () => {
      expect(createHtmlCode("inline", false)).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__inline\\" href=\\"#main\\">Link</a>"',
      );
    });
    it("when disabled", () => {
      expect(createHtmlCode("inline", true)).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__disabled neo-link__inline\\" href=\\"#main\\">Link</a>"',
      );
    });
  });
});

describe(createReactCode.name, () => {
  describe("standalone link react code tests", () => {
    it("when enabled", () => {
      expect(createReactCode("standalone", false)).toMatchInlineSnapshot(
        '"<Link href=\\"#main\\">Link</Link>"',
      );
    });

    it("when disabled", () => {
      expect(createReactCode("standalone", true)).toMatchInlineSnapshot(
        '"<Link href=\\"#main\\" disabled>Link</Link>"',
      );
    });
  });
  describe("inline link react code tests", () => {
    it("when enabled", () => {
      expect(createReactCode("inline", false)).toMatchInlineSnapshot(
        '"<Link href=\\"#main\\" inline>Link</Link>"',
      );
    });

    it("when disabled", () => {
      expect(createReactCode("inline", true)).toMatchInlineSnapshot(
        '"<Link href=\\"#main\\" disabled inline>Link</Link>"',
      );
    });
  });
});
