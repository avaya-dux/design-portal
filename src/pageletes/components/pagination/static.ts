import type { TopicsDict } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

export const sandbox = "https://codesandbox.io/s/neo-react-dropdown-7rc6m9";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-menu";

export const defaultHtml = prettyPrintHtml(
  `<button class="neo-btn neo-btn-primary neo-btn-primary--default">default</button>`,
);

export const defaultReact = prettyPrintReact(
  `<button class="neo-btn neo-btn-primary neo-btn-primary--default">default</button>`,
);

type PaginationTopicNames =
  | "playground"
  | "anatomy"
  | "behavior"
  | "specs"
  | "keyboard"
  | "related";

const component = "pagination";
export const topics: TopicsDict<PaginationTopicNames> = {
  playground: {
    order: 0,
    id: `${component}-playground`,
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: `${component}-anatomy`,
    title: "Anatomy",
  },
  behavior: {
    order: 2,
    id: `${component}-checkbox`,
    title: "Behavior",
  },
  specs: {
    order: 3,
    id: `${component}-specs`,
    title: "Specs",
  },
  keyboard: {
    order: 4,
    id: `${component}-keyboard-interactions`,
    title: "Keyboard Interactions",
  },
  related: {
    order: 5,
    id: `${component}-related-content`,
    title: "Related Content",
  },
};
