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
  | "dynamicContentVsStaticContent"
  | "progressiveLoading"
  | "behavior"
  | "shimmerVsSpinner"
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
  dynamicContentVsStaticContent: {
    order: 2,
    id: "shimmer-dcsc",
    title: "Dynamic Content vs Static Content",
  },
  progressiveLoading: {
    order: 3,
    id: "shimmer-loading",
    title: "Progressive Loading",
  },
  behavior: {
    order: 4,
    id: "shimmer-behavior",
    title: "Behavior",
  },
  shimmerVsSpinner: {
    order: 5,
    id: "shimmer-vs-spinner",
    title: "Shimmer vs Spinner",
  },
  relatedContent: {
    order: 6,
    id: "shimmer-related-content",
    title: "Related Content",
  },
};
