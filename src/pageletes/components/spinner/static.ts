import type { TopicsDict } from "components";

export const defaultHtml = `<div class="neo-spinner"></div>`;
export const defaultReact = `<Spinner />`;
export const sandbox = "https://codesandbox.io/s/neo-react-spinner-yj5o5i";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-spinner--default";

type SpinnerTopicNames =
  | "playground"
  | "anatomy"
  | "behavior"
  | "specs"
  | "related";

export const topics: TopicsDict<SpinnerTopicNames> = {
  playground: {
    order: 0,
    id: "spinner-playground",
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: "anatomy",
    title: "Anatomy",
  },
  behavior: {
    order: 2,
    id: "behavior",
    title: "Behavior",
  },
  specs: {
    order: 3,
    id: "specs",
    title: "Specs",
  },
  related: {
    order: 4,
    id: "related",
    title: "Related Content",
  },
};
