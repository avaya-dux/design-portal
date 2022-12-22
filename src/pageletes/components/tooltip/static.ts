import type { TopicsDict } from "components";

type TooltipTopicNames = "playground" | "basics";

export const topics: TopicsDict<TooltipTopicNames> = {
  playground: {
    order: 0,
    id: "tooltip-playground",
    title: "Interactive Playground",
  },
  basics: {
    order: 1,
    id: "tooltip-html-instructions",
    title: "HTML Instructions",
  },
};
