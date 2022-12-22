import type { TopicsDict } from "components";

type TooltipTopicNames = "playground" | "basics" | "multiline" | "positioning";

export const topics: TopicsDict<TooltipTopicNames> = {
  playground: {
    order: 0,
    id: "tooltip-playground",
    title: "Interactive Playground",
  },
  basics: {
    order: 1,
    id: "tooltip-basics",
    title: "Tooltip Basics",
  },
  multiline: {
    order: 2,
    id: "tooltip-multiline",
    title: "Multiline Tooltip",
  },
  positioning: {
    order: 3,
    id: "tooltip-positioning",
    title: "Tooltip Positioning",
  },
};
