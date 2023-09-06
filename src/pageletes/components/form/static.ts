import type { TopicsDict } from "components";

export const sandbox = "https://codesandbox.io/";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/";

type BreadcrumbTopicNames =
  | "playground"
  | "anatomy"
  | "behavior"
  | "related";

export const topics: TopicsDict<BreadcrumbTopicNames> = {
  playground: {
    order: 0,
    id: "form-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "form-anatomy", title: "Anatomy" },
  behavior: { order: 2, id: "form-behavior", title: "Behavior" },
  related: {
    order: 3,
    id: "form-related-content",
    title: "Related Content",
  },
};
