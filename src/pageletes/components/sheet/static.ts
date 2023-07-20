import type { TopicsDict } from "components";

type SheetTopicNames =
  | "playground"
  | "anatomy"
  | "behavior"
  | "specs"
  | "keyboard"
  | "related";

export const topics: TopicsDict<SheetTopicNames> = {
  playground: {
    order: 0,
    id: "sheet-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "sheet-anatomy", title: "Anatomy" },
  behavior: { order: 2, id: "sheet-behavior", title: "Behavior" },
  specs: {
    order: 3,
    id: "sheet-specs",
    title: "Specs",
  },
  keyboard: { order: 4, id: "sheet-keyboard", title: "Keyboard Interactions" },
  related: {
    order: 5,
    id: "sheet-related-content",
    title: "Related Content",
  },
};
