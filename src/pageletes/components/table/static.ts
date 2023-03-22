import type { TopicsDict } from "components";

type DropdownTopicNames =
  | "playground"
  | "anatomy"
  | "states"
  | "positioning"
  | "behavior"
  | "specs"
  | "keyboard"
  | "related";

export const topics: TopicsDict<DropdownTopicNames> = {
  playground: {
    order: 0,
    id: "table-playground",
    title: "Interactive Playground",
  },
  // anatomy: { order: 1, id: "table-anatomy", title: "Anatomy" },
  // states: { order: 2, id: "table-states", title: "States" },
  // positioning: {
  //   order: 3,
  //   id: "table-positioning",
  //   title: "Positioning",
  // },
  // behavior: { order: 4, id: "table-behavior", title: "Behavior" },
  specs: { order: 5, id: "table-specs", title: "Specs" },
  keyboard: {
    order: 6,
    id: "table-keyboard-interactions",
    title: "Keyboard Interactions",
  },
  related: {
    order: 7,
    id: "table-related-content",
    title: "Related Content",
  },
};
