import type { TopicsDict } from "components";

export const sandbox = "https://codesandbox.io/";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/";

type AvatarTopicNames =
  | "playground"
  | "anatomy"
  | "type"
  | "behavior"
  | "specs"
  | "related";

export const topics: TopicsDict<AvatarTopicNames> = {
  playground: {
    order: 0,
    id: "avatar-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "avatar-anatomy", title: "Anatomy" },
  type: { order: 3, id: "avatar-type", title: "Type" },
  behavior: { order: 4, id: "avatar-behavior", title: "Behavior" },
  specs: {
    order: 5,
    id: "avatar-specs",
    title: "Specs",
  },
  related: {
    order: 6,
    id: "avatar-related-content",
    title: "Related Content",
  },
};
