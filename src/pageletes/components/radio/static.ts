import type { TopicsDict } from "components";

type DropdownTopicNames =
  | "playground"
  | "anatomy"
  | "states"
  | "behavior"
  | "specs"
  | "keyboard"
  | "related";

export const topics: TopicsDict<DropdownTopicNames> = {
  playground: {
    order: 0,
    id: "radio-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "radio-anatomy", title: "Anatomy" },
  states: { order: 2, id: "radio-states", title: "States" },
  behavior: { order: 3, id: "radio-behavior", title: "Behavior" },
  specs: { order: 4, id: "radio-specs", title: "Specs" },
  keyboard: {
    order: 5,
    id: "radio-keyboard-interactions",
    title: "Keyboard Interactions",
  },
  related: {
    order: 6,
    id: "radio-related-content",
    title: "Related Content",
  },
};
