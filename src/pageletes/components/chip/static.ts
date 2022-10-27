import toDiffableHtml from "diffable-html";

import type { TopicsDict } from "components";

export const defaultHtml = toDiffableHtml(
  `<div class="neo-chip neo-chip--default">placeholder</div>`
);
export const defaultReact = toDiffableHtml(
  `<BasicChip chiptype="basic" text="placeholder" />`
);
export const sandbox = "https://codesandbox.io/s/neo-react-chips-conoc3";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-chips-basic-chip";

type ChipTopicNames =
  | "avatar"
  | "basic"
  | "closable"
  | "container"
  | "disabled"
  | "expandable"
  | "icon"
  | "keyboard"
  | "playground";

export const topics: TopicsDict<ChipTopicNames> = {
  playground: {
    order: 1,
    id: "chips-playground",
    title: "Interactive Playground",
  },
  basic: { order: 2, id: "basic-chips", title: "Basic Chips" },
  disabled: { order: 3, id: "disabled-chips", title: "Disabled Chips" },
  icon: { order: 4, id: "icon-chips", title: "Chips With Icons" },
  closable: {
    order: 5,
    id: "closable-icon-chips",
    title: "Chips With Close Icon",
  },
  expandable: { order: 6, id: "expandable-chips", title: "Expandable Chips" },
  avatar: { order: 7, id: "avatar-chips", title: "Chips With Avatar" },
  container: { order: 8, id: "chips-container", title: "Chips Container" },
  keyboard: {
    order: 9,
    id: "chips-keyboard-interactions",
    title: "Keyboard Interactions",
  },
};
