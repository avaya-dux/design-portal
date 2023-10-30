import type { TopicsDict } from "components";

type LocalizationTopicNames = "text" | "content" | "bidirectionality";

export const topics: TopicsDict<LocalizationTopicNames> = {
  text: {
    order: 0,
    id: "localization-text",
    title: "Text",
  },
  content: { order: 1, id: "localization-content", title: "Content" },
  bidirectionality: {
    order: 2,
    id: "localization-bidirectionality",
    title: "Bidirectionality",
  },
};
