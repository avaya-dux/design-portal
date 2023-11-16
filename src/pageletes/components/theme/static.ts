import type { TopicsDict } from "components";

type ThemeTopicNames = "playground" | "type" | "behavior" | "related";

const page = "theme";

export const topics: TopicsDict<ThemeTopicNames> = {
  playground: {
    order: 0,
    id: `${page}-playground`,
    title: "Interactive Playground",
  },
  type: {
    order: 1,
    id: `${page}-type`,
    title: "Type",
  },
  behavior: {
    order: 2,
    id: `${page}-behavior`,
    title: "Behavior",
  },
  related: {
    order: 3,
    id: `${page}-related`,
    title: "Related Content",
  },
};
