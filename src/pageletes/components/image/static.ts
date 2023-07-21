import type { TopicsDict } from "components";

type ImageTopicNames =
  | "playground"
  | "type"
  | "use"
  | "accessibility"
  | "related";

const component = "image";

export const topics: TopicsDict<ImageTopicNames> = {
  playground: {
    order: 0,
    id: `${component}-playground`,
    title: "Interactive Playground",
  },
  type: {
    order: 0,
    id: `${component}-type`,
    title: "Type",
  },
  use: {
    order: 0,
    id: `${component}-when-to-use`,
    title: "When to Use",
  },
  accessibility: {
    order: 0,
    id: `${component}-accessibility`,
    title: "Accessibility",
  },
  related: {
    order: 0,
    id: `${component}-related`,
    title: "Related Content",
  },
};
