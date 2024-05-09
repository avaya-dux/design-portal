import type { TopicsDict } from "components";

type LocalizationTopicNames = "text" | "content" | "bidirectionality";

export const topics: TopicsDict<LocalizationTopicNames> = {
  text: {
    order: 0,
    id: "internationalization-text",
    title: "Text",
  },
  content: { order: 1, id: "internationalization-content", title: "Content" },
  bidirectionality: {
    order: 2,
    id: "internationalization-bidirectionality",
    title: "Bidirectionality",
  },
};
