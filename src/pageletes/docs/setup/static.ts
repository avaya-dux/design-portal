import type { TopicsDict } from "components";

type SetupTopicNames =
  | "gettingstarted"
  | "neoreact"
  | "otherframeworks"
  | "usageexamples"
  | "projectexamples";

export const topics: TopicsDict<SetupTopicNames> = {
  gettingstarted: {
    order: 0,
    id: "gettingstarted",
    title: "Getting Started",
  },
  neoreact: { order: 1, id: "neoreact", title: "Neo React Framework" },
  otherframeworks: {
    order: 2,
    id: "otherframeworks",
    title: "Other Frameworks (CSS)",
  },
  usageexamples: { order: 3, id: "usageexamples", title: "Usage Examples" },
  projectexamples: {
    order: 4,
    id: "projectexamples",
    title: "Example Projects",
  },
};
