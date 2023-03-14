import type { TopicsDict } from "components";
import { prettyPrintHtml } from "helpers";

export const defaultHtml = prettyPrintHtml(`
  <div
    aria-busy="true"
    aria-live="polite"
    role="alert"
    class="neo-shimmer neo-shimmer__rectangle">
  </div>`);
export const defaultReact = "<Shimmer loopInfinitely />";
export const sandbox =
  "https://codesandbox.io/s/neo-react-shimmer-bgxipm?file=/src/App.js";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-shimmer--default";

type ShimmerTopicNames =
  | "playground"
  | "anatomy"
  | "type"
  | "behavior"
  | "relatedContent";

export const topics: TopicsDict<ShimmerTopicNames> = {
  playground: {
    order: 0,
    id: "shimmer-playground",
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: "shimmer-anatomy",
    title: "Anatomy",
  },
  type: {
    order: 2,
    id: "shimmer-type",
    title: "Type",
  },
  behavior: {
    order: 3,
    id: "shimmer-behavior",
    title: "Behavior",
  },
  relatedContent: {
    order: 4,
    id: "shimmer-related-content",
    title: "Related Content",
  },
};
