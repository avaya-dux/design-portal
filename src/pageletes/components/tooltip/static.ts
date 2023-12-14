import type { TopicsDict } from "components";

type TooltipTopicNames =
  | "playground"
  | "anatomy"
  | "positioning"
  | "behavior"
  | "specs"
  | "keyboardInteractions"
  | "relatedComponents";

export const topics: TopicsDict<TooltipTopicNames> = {
  playground: {
    order: 0,
    id: "tooltip-playground",
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: "tooltip-anatomy",
    title: "Anatomy",
  },
  positioning: {
    order: 2,
    id: "tooltip-positioning",
    title: "Positioning",
  },
  behavior: {
    order: 3,
    id: "tooltip-behavior",
    title: "Behavior",
  },
  specs: {
    order: 4,
    id: "tooltip-specs",
    title: "Specs",
  },
  keyboardInteractions: {
    order: 5,
    id: "tooltip-keyboard-interactions",
    title: "Keyboard Interactions",
  },
  relatedComponents: {
    order: 6,
    id: "tooltip-related-components",
    title: "Related Content",
  },
};
