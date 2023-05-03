import type { TopicsDict } from "components";

type ToastTopicNames =
  | "playground"
  | "anatomy"
  | "behavior"
  | "specs"
  | "related";

const component = "toast";

export const topics: TopicsDict<ToastTopicNames> = {
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
  behavior: {
    order: 2,
    id: `${component}-behavior`,
    title: "Behavior",
  },
  specs: {
    order: 3,
    id: `${component}-specs`,
    title: "Specs",
  },
  related: {
    order: 4,
    id: `${component}-related`,
    title: "Related Content",
  },
};
