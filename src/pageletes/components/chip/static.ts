import type { TopicsDict } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

export const defaultHtml = prettyPrintHtml(`
<div class="neo-chip neo-chip--default">This</div>
<div class="neo-chip neo-chip--success">is</div>
<div class="neo-chip neo-chip--info">a</div>
<div class="neo-chip neo-chip--alert">placeholder</div>
<div class="neo-chip neo-chip--warning">example</div>
`);
export const defaultReact = prettyPrintReact(`
<BasicChip chiptype="basic" variant="default" text="This" />
<BasicChip chiptype="basic" variant="success" text="is" />
<BasicChip chiptype="basic" variant="info" text="a" />
<BasicChip chiptype="basic" variant="alert" text="placeholder" />
<BasicChip chiptype="basic" variant="warning" text="example" />
`);

export const sandbox = "https://codesandbox.io/s/neo-react-chips-conoc3";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-chips-basic-chip";

type ChipTopicNames =
  | "avatar"
  | "basic"
  | "closable"
  | "container"
  | "disabled"
  | "icon"
  | "keyboard"
  | "playground";

export const topics: TopicsDict<ChipTopicNames> = {
  playground: {
    order: 0,
    id: "chips-playground",
    title: "Interactive Playground",
  },
  basic: { order: 1, id: "basic-chips", title: "Basic Chips" },
  disabled: { order: 2, id: "disabled-chips", title: "Disabled Chips" },
  icon: { order: 3, id: "icon-chips", title: "Chips With Icons" },
  closable: {
    order: 4,
    id: "closable-icon-chips",
    title: "Chips With Close Icon",
  },
  avatar: { order: 5, id: "avatar-chips", title: "Chips With Avatar" },
  container: { order: 6, id: "chips-container", title: "Chips Container" },
  keyboard: {
    order: 7,
    id: "chips-keyboard-interactions",
    title: "Keyboard Interactions",
  },
};
