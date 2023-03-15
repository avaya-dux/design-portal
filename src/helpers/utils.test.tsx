import {
  prettyPrintHtml,
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "./utils";

import { Checkbox, CheckboxGroup } from "@avaya/neo-react";

describe(prettyPrintReactElementToString.name, () => {
  it("pretty react", () => {
    const element = (
      <CheckboxGroup groupName="checkbox-group" label="Checkbox Group">
        <Checkbox value="1" disabled={true}>
          example value
        </Checkbox>
        <Checkbox value="2" disabled={false}>
          another value
        </Checkbox>
      </CheckboxGroup>
    );
    expect(prettyPrintReactElementToString(element)).toMatchInlineSnapshot(`
      "<CheckboxGroup
        groupName=\\"checkbox-group\\"
        label=\\"Checkbox Group\\"
      >
        <Checkbox
          disabled
          value=\\"1\\"
        >
          example value
        </Checkbox>
        <Checkbox
          value=\\"2\\"
        >
          another value
        </Checkbox>
      </CheckboxGroup>"
    `);
  });
});
describe(prettyPrintReactElementToHtml.name, () => {
  it("convert to html correctly", () => {
    const element = (
      <CheckboxGroup groupName="checkbox-group" label="Checkbox Group">
        <Checkbox value="1">example value</Checkbox>
        <Checkbox value="2">another value</Checkbox>
      </CheckboxGroup>
    );
    expect(prettyPrintReactElementToHtml(element)).toMatchInlineSnapshot(
      `
      "<div
        data-testid=\\"NeoInputWrapper-root\\"
        class=\\"neo-form-control\\"
        role=\\"group\\"
        aria-labelledby=\\"checkbox-group-label\\"
      >
        <div
          data-testid=\\"NeoInputWrapper-group-root\\"
          class=\\"neo-input-group\\"
        >
          <span id=\\"checkbox-group-label\\">
            Checkbox Group
          </span>
          <input
            type=\\"checkbox\\"
            id=\\":R6:\\"
            aria-checked=\\"false\\"
            aria-label=\\"example value\\"
            class=\\"neo-check\\"
            name=\\"checkbox-group\\"
            value=\\"1\\"
          >
          <label for=\\":R6:\\">
            example value
          </label>
          <input
            type=\\"checkbox\\"
            id=\\":Ra:\\"
            aria-checked=\\"false\\"
            aria-label=\\"another value\\"
            class=\\"neo-check\\"
            name=\\"checkbox-group\\"
            value=\\"2\\"
          >
          <label for=\\":Ra:\\">
            another value
          </label>
        </div>
      </div>"
    `
    );
  });
});

describe("prettyPrintHtml", () => {
  it("void element input has no ending tag per html spec", () => {
    expect(prettyPrintHtml('<input type="text" name="name"/>'))
      .toMatchInlineSnapshot(`
          "<input
            type=\\"text\\"
            name=\\"name\\"
          >"
        `);
  });
  it("void element br has no ending tag per html spec", () => {
    expect(prettyPrintHtml("<br />")).toMatchInlineSnapshot('"<br>"');
  });
});
