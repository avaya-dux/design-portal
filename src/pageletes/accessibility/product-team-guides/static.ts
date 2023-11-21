import type { TopicsDict } from "components";

type PTGTopicNames = "visualdesign" | "development" | "qualityassurance";

const component = "ptg";
export const topics: TopicsDict<PTGTopicNames> = {
  visualdesign: {
    order: 0,
    id: `${component}-visual-design`,
    title: "Visual Design",
  },
  development: {
    order: 1,
    id: `${component}-development`,
    title: "Development",
  },
  qualityassurance: {
    order: 2,
    id: `${component}-quality-assurance`,
    title: "Quality Assurance",
  },
};
