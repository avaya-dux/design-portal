import type { TopicsDict } from "components";

type LinkTopicNames =
  | "playground"
  | "anatomy"
  | "states"
  | "type"
  | "behavior"
  | "specs"
  | "keyboard"
  | "related";

export const topics: TopicsDict<LinkTopicNames> = {
  playground: {
    order: 0,
    id: "list-playground",
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: "list-anatomy",
    title: "Anatomy",
  },
  states: {
    order: 2,
    id: "list-states",
    title: "States",
  },
  type: { order: 3, id: "list-type", title: "Type" },
  behavior: { order: 4, id: "list-behavior", title: "Behavior" },
  specs: {
    order: 5,
    id: "list-specs",
    title: "Specs",
  },
  keyboard: {
    order: 6,
    id: "list-keyboard-interactions",
    title: "Keyboard Interactions",
  },
  related: {
    order: 7,
    id: "list-related-content",
    title: "Related Content",
  },
};
