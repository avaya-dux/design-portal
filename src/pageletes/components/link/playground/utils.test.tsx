import { createReactCode, createHtmlCode } from "./utils";

describe(createHtmlCode.name, () => {
  describe("standalone link html tests", () => {
    it("when enabled and icon is none", () => {
      expect(createHtmlCode("standalone", false, "none")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when enabled and icon is left", () => {
      expect(createHtmlCode("standalone", false, "left")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-icon-print\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when enabled and icon is right", () => {
      expect(
        createHtmlCode("standalone", false, "right")
      ).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-icon-print\\" dir=\\"rtl\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when disabled and icon is none", () => {
      expect(createHtmlCode("standalone", true, "none")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__disabled\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when disabled and icon is left", () => {
      expect(createHtmlCode("standalone", true, "left")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-icon-print neo-link__disabled\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when disabled and icon is right", () => {
      expect(createHtmlCode("standalone", true, "right")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-icon-print neo-link__disabled\\" dir=\\"rtl\\" href=\\"#main\\">Link</a>"'
      );
    });
  });

  describe("inline link tests", () => {
    it("when enabled and icon is none", () => {
      expect(createHtmlCode("inline", false, "none")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when enabled and icon is left", () => {
      expect(createHtmlCode("inline", false, "left")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when enabled and icon is right", () => {
      expect(createHtmlCode("inline", false, "right")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when disabled and icon is none", () => {
      expect(createHtmlCode("inline", true, "none")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__disabled neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when disabled and icon is left", () => {
      expect(createHtmlCode("inline", true, "left")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__disabled neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when disabled and icon is right", () => {
      expect(createHtmlCode("inline", true, "right")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__disabled neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
  });
});

describe(createReactCode.name, () => {
  describe("standalone link tests", () => {
    it("when enabled and icon is none", () => {
      expect(
        createReactCode("standalone", false, "none")
      ).toMatchInlineSnapshot('"<Link href=\\"#main\\">Link</Link>"');
    });
    it("when enabled and icon is left", () => {
      expect(
        createReactCode("standalone", false, "left")
      ).toMatchInlineSnapshot(
        '"<Link href=\\"#main\\" placement=\\"left\\" icon=\\"print\\">Link</Link>"'
      );
    });
    it("when enabled and icon is right", () => {
      expect(
        createReactCode("standalone", false, "right")
      ).toMatchInlineSnapshot(
        '"<Link href=\\"#main\\" placement=\\"right\\" icon=\\"print\\">Link</Link>"'
      );
    });
    it("when disabled and icon is none", () => {
      expect(createReactCode("standalone", true, "none")).toMatchInlineSnapshot(
        '"<Link href=\\"#main\\" disabled>Link</Link>"'
      );
    });
    it("when disabled and icon is left", () => {
      expect(createReactCode("standalone", true, "left")).toMatchInlineSnapshot(
        '"<Link href=\\"#main\\" disabled placement=\\"left\\" icon=\\"print\\">Link</Link>"'
      );
    });
    it("when disabled and icon is right", () => {
      expect(
        createReactCode("standalone", true, "right")
      ).toMatchInlineSnapshot(
        '"<Link href=\\"#main\\" disabled placement=\\"right\\" icon=\\"print\\">Link</Link>"'
      );
    });
  });
  describe("inline link tests", () => {
    it("when enabled and icon is none", () => {
      expect(createHtmlCode("inline", false, "none")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when enabled and icon is left", () => {
      expect(createHtmlCode("inline", false, "left")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when enabled and icon is right", () => {
      expect(createHtmlCode("inline", false, "right")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when disabled and icon is none", () => {
      expect(createHtmlCode("inline", true, "none")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__disabled neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when disabled and icon is left", () => {
      expect(createHtmlCode("inline", true, "left")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__disabled neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
    it("when disabled and icon is right right", () => {
      expect(createHtmlCode("inline", true, "right")).toMatchInlineSnapshot(
        '"<a class=\\"neo-link neo-link__disabled neo-link__inline\\" href=\\"#main\\">Link</a>"'
      );
    });
  });
});
