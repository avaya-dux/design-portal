import type { TopicsDict } from "components";

export const sandbox = "https://codesandbox.io/s/neo-react-dropdown-7rc6m9";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-menu";

type DropdownTopicNames =
  | "anatomy"
  | "states"
  | "positioning"
  | "types"
  | "behavior"
  | "specs"
  | "keyboard"
  | "playground"
  | "related";

export const topics: TopicsDict<DropdownTopicNames> = {
  playground: {
    order: 0,
    id: "dropdown-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "dropdown-anatomy", title: "Anatomy" },
  states: { order: 2, id: "dropdown-states", title: "States" },
  positioning: { order: 3, id: "dropdown-positioning", title: "Positioning" },
  types: {
    order: 4,
    id: "dropdown-types",
    title: "Types",
  },
  behavior: { order: 5, id: "dropdown-behavior", title: "Behavior" },
  specs: { order: 6, id: "dropdown-specs", title: "Specs" },
  keyboard: {
    order: 7,
    id: "dropdown-keyboard-interactions",
    title: "Keyboard Interactions",
  },
  related: {
    order: 7,
    id: "dropdown-related-content",
    title: "Related Content",
  },
};
