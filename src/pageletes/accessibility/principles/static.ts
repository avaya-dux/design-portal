import type { TopicsDict } from "components";

type PrinciplesTopicNames = "accessibility" | "regulations" | "disabilities";

const component = "principles";
export const topics: TopicsDict<PrinciplesTopicNames> = {
  accessibility: {
    order: 0,
    id: `${component}-accessibility`,
    title: "Neo and Accessibility",
  },
  regulations: {
    order: 1,
    id: `${component}-regulations`,
    title: "Standards and Regulations",
  },
  disabilities: {
    order: 2,
    id: `${component}-disabilities`,
    title: "Types of Disabilities",
  },
};
