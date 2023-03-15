import type { TopicsDict } from "components";

type CheckboxTopicNames =
  | "playground"
  | "anatomy"
  | "states"
  | "behavior"
  | "specs"
  | "keyboard"
  | "related";

const component = "checkbox";
export const topics: TopicsDict<CheckboxTopicNames> = {
  playground: {
    order: 0,
    id: `${component}-playground`,
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: `${component}-anatomy`,
    title: "Anatomy",
  },
  states: {
    order: 2,
    id: `${component}-states`,
    title: "States",
  },
  behavior: { order: 3, id: `${component}-checkbox`, title: "Behavior" },
  specs: {
    order: 4,
    id: `${component}-specs`,
    title: "Specs",
  },
  keyboard: {
    order: 5,
    id: `${component}-keyboard-interactions`,
    title: "Keyboard Interactions",
  },
  related: {
    order: 6,
    id: `${component}-related-content`,
    title: "Related Content",
  },
};
