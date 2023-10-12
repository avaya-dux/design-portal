import type { TopicsDict } from "components";

export const sandbox = "https://codesandbox.io/";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/";

type HeaderTopicNames = "playground" | "anatomy" | "states" | "types" | "behavior"
  | "specs" | "keyboard" | "related";


export const topics: TopicsDict<HeaderTopicNames> = {
  playground: {
    order: 0,
    id: "header-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "header-anatomy", title: "Anatomy" },
  states: { order: 2, id: "header-states", title: "States" },
  types: { order: 3, id: "header-types", title: "Types" },
  behavior: { order: 4, id: "header-behavior", title: "Behavior" },
  specs: { order: 5, id: "header-specs", title: "Specs" },
  keyboard: { order: 6, id: "header-keyboard", title: "Keyboard Interactions" },
  related: {
    order: 7,
    id: "header-related-content",
    title: "Related Content",
  },
};
