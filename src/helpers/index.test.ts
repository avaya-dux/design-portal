import { prettyPrintHtml } from "./index";

describe("prettyPrintHtml", () => {
    it("void element input has no ending tag per html spec", () => {
        expect(prettyPrintHtml("<input type=\"text\" name=\"name\"/>")).toMatchInlineSnapshot(`
          "<input
            type=\\"text\\"
            name=\\"name\\"
          >"
        `);
    })
    it("void element br has no ending tag per html spec", () => {
        expect(prettyPrintHtml("<br />")).toMatchInlineSnapshot('"<br>"');
    })
})