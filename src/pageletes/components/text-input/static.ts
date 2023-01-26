import type { TopicsDict } from "components";

export const sandbox = "https://codesandbox.io/s/";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/";

type TextInputTopicNames =
  | "playground"
  | "anatomy"
  | "states"
  | "types"
  | "behavior"
  | "specs"
  | "interactions";

export const topics: TopicsDict<TextInputTopicNames> = {
  playground: {
    order: 0,
    id: "text-input-playground",
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: "text-input-anatomy",
    title: "Anatomy",
  },
  states: {
    order: 2,
    id: "text-input-states",
    title: "States",
  },
  types: {
    order: 3,
    id: "text-input-types",
    title: "Types",
  },
  behavior: {
    order: 4,
    id: "text-input-behavior",
    title: "Behavior",
  },
  specs: {
    order: 5,
    id: "text-input-specs",
    title: "Specs",
  },
  interactions: {
    order: 6,
    id: "text-input-interactions",
    title: "Keyboard Interactions",
  },
};
