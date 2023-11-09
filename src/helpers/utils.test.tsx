import type { PageAstroInstance } from "./types";
import {
  prettyPrintHtml,
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
  moveToStart
} from "./utils";

import {
  Checkbox,
  CheckboxGroup,
  List,
  ListItem,
  IconButton,
  Icon,
} from "@avaya/neo-react";

describe("moveToStart", () => {
  it("should move element to start if found", () => {
    expect(moveToStart([{ url: "aa" }, { url: "bb" }] as PageAstroInstance[], "b")).toEqual([{ url: "bb" }, { url: "aa" }])
  })
  it("should return the same array if not found", () => {
    expect(moveToStart([{ url: "aa" }, { url: "bb" }] as PageAstroInstance[], "d")).toEqual([{ url: "aa" }, { url: "bb" }])
  })
  it("should do nothing if array is empty", () => {
    expect(moveToStart([], "b")).toEqual([])
  })
})
describe(prettyPrintReactElementToString.name, () => {
  it("prettyPrint CheckboxGroup to react ", () => {
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
  it("prettyPrint List to react ", () => {
    const element = (
      <List itemType="ListItem">
        <ListItem
          actions={[
            <IconButton
              aria-label="add call"
              data-testid="neo-button-add-call"
              icon="call-add"
              id="btn-add-call"
              shape="circle"
              variant="tertiary"
            />,
          ]}
          icon={<Icon aria-label="star-icon" icon="star" />}
        >
          Aman Kharti
        </ListItem>

        <ListItem
          actions={[
            <IconButton
              aria-label="add call"
              data-testid="neo-button-add-call"
              icon="call-add"
              id="btn-add-call"
              shape="circle"
              variant="tertiary"
            />,
          ]}
          icon={<Icon aria-label="star-icon" icon="star" />}
        >
          Aman Kharti
        </ListItem>
      </List>
    );
    expect(prettyPrintReactElementToString(element)).toMatchInlineSnapshot(`
      "<List itemType=\\"ListItem\\">
        <ListItem
          actions={[
            <IconButton aria-label=\\"add call\\" data-testid=\\"neo-button-add-call\\" icon=\\"call-add\\" id=\\"btn-add-call\\" shape=\\"circle\\" variant=\\"tertiary\\"/>
          ]}
          icon={<Icon aria-label=\\"star-icon\\" icon=\\"star\\"/>}
        >
          Aman Kharti
        </ListItem>
        <ListItem
          actions={[
            <IconButton aria-label=\\"add call\\" data-testid=\\"neo-button-add-call\\" icon=\\"call-add\\" id=\\"btn-add-call\\" shape=\\"circle\\" variant=\\"tertiary\\"/>
          ]}
          icon={<Icon aria-label=\\"star-icon\\" icon=\\"star\\"/>}
        >
          Aman Kharti
        </ListItem>
      </List>"
    `);
  });
});
describe(prettyPrintReactElementToHtml.name, () => {
  it("pretty print CheckboxGroup to html", () => {
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
    `,
    );
  });

  it("pretty print List to html", () => {
    const element = (
      <List itemType="ListItem">
        <ListItem
          actions={[
            <IconButton
              aria-label="add call"
              data-testid="neo-button-add-call"
              icon="call-add"
              id="btn-add-call"
              shape="circle"
              variant="tertiary"
            />,
          ]}
          icon={<Icon aria-label="star-icon" icon="star" />}
        >
          Aman Kharti
        </ListItem>

        <ListItem
          actions={[
            <IconButton
              aria-label="add call"
              data-testid="neo-button-add-call"
              icon="call-add"
              id="btn-add-call"
              shape="circle"
              variant="tertiary"
            />,
          ]}
          icon={<Icon aria-label="star-icon" icon="star" />}
        >
          Aman Kharti
        </ListItem>
      </List>
    );
    expect(prettyPrintReactElementToHtml(element)).toMatchInlineSnapshot(
      `
      "<ul class=\\"neo-group-list neo-group-list--hover\\">
        <li class=\\"neo-group-list__wrapper\\">
          <div class=\\"neo-group-list__item\\">
            <span
              role=\\"img\\"
              aria-label=\\"star-icon\\"
              class=\\"neo-icon-star neo-icon--small\\"
            >
            </span>
          </div>
          <div class=\\"neo-group-list__item neo-group-list__item--middle\\">
            Aman Kharti
          </div>
          <div class=\\"neo-group-list__item\\">
            <button
              aria-label=\\"add call\\"
              class=\\"neo-btn neo-btn-circle neo-btn--default neo-btn-tertiary neo-btn-tertiary--default neo-btn-circle-tertiary--default\\"
              data-badge
              data-testid=\\"neo-button-add-call\\"
              id=\\"btn-add-call\\"
            >
              <span
                class=\\"neo-icon-call-add\\"
                style=\\"font-size:20px\\"
              >
              </span>
            </button>
          </div>
        </li>
        <li class=\\"neo-group-list__wrapper\\">
          <div class=\\"neo-group-list__item\\">
            <span
              role=\\"img\\"
              aria-label=\\"star-icon\\"
              class=\\"neo-icon-star neo-icon--small\\"
            >
            </span>
          </div>
          <div class=\\"neo-group-list__item neo-group-list__item--middle\\">
            Aman Kharti
          </div>
          <div class=\\"neo-group-list__item\\">
            <button
              aria-label=\\"add call\\"
              class=\\"neo-btn neo-btn-circle neo-btn--default neo-btn-tertiary neo-btn-tertiary--default neo-btn-circle-tertiary--default\\"
              data-badge
              data-testid=\\"neo-button-add-call\\"
              id=\\"btn-add-call\\"
            >
              <span
                class=\\"neo-icon-call-add\\"
                style=\\"font-size:20px\\"
              >
              </span>
            </button>
          </div>
        </li>
      </ul>"
    `,
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
