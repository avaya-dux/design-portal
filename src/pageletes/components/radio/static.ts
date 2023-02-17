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
    id: "radiogroup-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "radiogroup-anatomy", title: "Anatomy" },
  states: { order: 2, id: "radiogroup-states", title: "States" },
  behavior: { order: 3, id: "radiogroup-behavior", title: "Behavior" },
  specs: { order: 4, id: "radiogroup-specs", title: "Specs" },
  keyboard: {
    order: 5,
    id: "radiogroup-keyboard-interactions",
    title: "Keyboard Interactions",
  },
  related: {
    order: 6,
    id: "radiogroup-related-content",
    title: "Related Content",
  },
};