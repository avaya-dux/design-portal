import type { TopicsDict } from "components";

type StandardsTopicNames = "wcag" | "aria" | "section508";

const component = "standards";
export const standards: TopicsDict<StandardsTopicNames> = {
  wcag: {
    order: 0,
    id: `${component}-wcag`,
    title: "WCAG 2.1",
  },
  aria: {
    order: 1,
    id: `${component}-aria`,
    title: "ARIA 1.1",
  },
  section508: {
    order: 2,
    id: `${component}-section508`,
    title: "Section 508",
  },
};
