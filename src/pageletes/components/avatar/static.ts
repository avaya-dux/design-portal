import type { TopicsDict } from "components";

export const sandbox =
  "https://codesandbox.io/";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/";

type AvatarTopicNames =
  | "playground"
  | "anatomy"
  | "states"
  | "type"
  | "behavior"
  | "specs"
  | "keyboard"
  | "related";

export const topics: TopicsDict<AvatarTopicNames> = {
  playground: {
    order: 0,
    id: "avatar-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "avatar-anatomy", title: "Anatomy" },
  states: {
    order: 2,
    id: "avatar-states",
    title: "States",
  },
  type: { order: 3, id: "avatar-type", title: "Type" },
  behavior: { order: 4, id: "avatar-behavior", title: "Behavior" },
  specs: {
    order: 5,
    id: "avatar-specs",
    title: "Specs",
  },
  keyboard: {
    order: 6,
    id: "avatar-keyboard-interactions",
    title: "Keyboard Interactions",
  },
  related: {
    order: 7,
    id: "avatar-related-content",
    title: "Related Content",
  },
};
