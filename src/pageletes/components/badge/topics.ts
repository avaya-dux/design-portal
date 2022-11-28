import type { TopicsDict } from "components";

type BadgeTopicNames = "playground" | "anatomy" | "usage" | "relatedContent";

export const topics: TopicsDict<BadgeTopicNames> = {
  playground: {
    order: 0,
    id: "badge-playground",
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: "badge-anatomy",
    title: "Anatomy",
  },
  usage: {
    order: 2,
    id: "badge-usage",
    title: "Usage",
  },
  relatedContent: {
    order: 3,
    id: "related-content",
    title: "Related Content",
  },
};
