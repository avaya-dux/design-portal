import { createReactCode, createHtmlCode } from "./utils";

describe(createHtmlCode.name, () => {
  it("creates correctly for standalone link", () => {
    expect(createHtmlCode("standalone", false, "none")).toMatchInlineSnapshot(
      '"<a class=\\"neo-link\\" href=\\"#main\\">Link</a>"'
    );
  });
  it("creates correctly for disabled standalone link", () => {
    expect(createHtmlCode("standalone", true, "none")).toMatchInlineSnapshot(
      '"<a class=\\"neo-link neo-link__disabled\\" href=\\"#main\\">Link</a>"'
    );
  });
  it("creates correctly for disabled standalone link with right icon", () => {
    expect(createHtmlCode("standalone", true, "right")).toMatchInlineSnapshot(
      '"<a class=\\"neo-link neo-icon-print neo-link__disabled\\" dir=\\"rtl\\" href=\\"#main\\">Link</a>"'
    );
  });
  it("creates correctly for inline link", () => {
    expect(createHtmlCode("inline", false, "none")).toMatchInlineSnapshot(
      '"<a class=\\"neo-link neo-link__inline\\" href=\\"#main\\">Link</a>"'
    );
  });
  it("creates correctly for disabled inline link", () => {
    expect(createHtmlCode("inline", true, "none")).toMatchInlineSnapshot(
      '"<a class=\\"neo-link neo-link__disabled neo-link__inline\\" href=\\"#main\\">Link</a>"'
    );
  });
});

describe(createReactCode.name, () => {
  it("creates correctly for standalone link", () => {
    expect(createReactCode("standalone", false, "none")).toMatchInlineSnapshot(
      '"<Link href=\\"#main\\">Link</Link>"'
    );
  });
  it("creates correctly for disabled standalone link", () => {
    expect(createReactCode("standalone", true, "none")).toMatchInlineSnapshot(
      '"<Link href=\\"#main\\" disabled>Link</Link>"'
    );
  });
  it("creates correctly for disabled standalone link with right icon", () => {
    expect(createReactCode("standalone", true, "right")).toMatchInlineSnapshot(
      '"<Link href=\\"#main\\" disabled placement=\\"right\\" icon=\\"print\\">Link</Link>"'
    );
  });
  it("creates correctly for inline link", () => {
    expect(createHtmlCode("inline", false, "none")).toMatchInlineSnapshot(
      '"<a class=\\"neo-link neo-link__inline\\" href=\\"#main\\">Link</a>"'
    );
  });
  it("creates correctly for disabled inline link", () => {
    expect(createHtmlCode("inline", true, "none")).toMatchInlineSnapshot(
      '"<a class=\\"neo-link neo-link__disabled neo-link__inline\\" href=\\"#main\\">Link</a>"'
    );
  });
  it("creates correctly for disabled inline link ignoring icon placement left", () => {
    expect(createHtmlCode("inline", true, "left")).toMatchInlineSnapshot(
      '"<a class=\\"neo-link neo-link__disabled neo-link__inline\\" href=\\"#main\\">Link</a>"'
    );
  });
  it("creates correctly for disabled inline link ignoring icon placement right", () => {
    expect(createHtmlCode("inline", true, "right")).toMatchInlineSnapshot(
      '"<a class=\\"neo-link neo-link__disabled neo-link__inline\\" href=\\"#main\\">Link</a>"'
    );
  });
});
