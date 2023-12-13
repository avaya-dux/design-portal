import type { TopicsDict } from "components";

type PrinciplesTopicNames = "vpat" | "getting-started" | "additionals";

const component = "resources-guides";
export const topics: TopicsDict<PrinciplesTopicNames> = {
  vpat: {
    order: 0,
    id: `${component}-vpat`,
    title: "What is a VPAT? What is an ACR?",
  },
  "getting-started": {
    order: 1,
    id: `${component}-getting-started`,
    title: "Getting Started",
  },
  additionals: {
    order: 2,
    id: `${component}-additionals`,
    title: "Additional Resources",
  },
};
