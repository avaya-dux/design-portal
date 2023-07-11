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

const component = "shimmer";

export const topics: TopicsDict<ShimmerTopicNames> = {
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
  type: {
    order: 2,
    id: `${component}-type`,
    title: "Type",
  },
  behavior: {
    order: 4,
    id: `${component}-behavior`,
    title: "Behavior",
  },
  relatedContent: {
    order: 5,
    id: "shimmer-related-content",
    title: "Related Content",
  },
};
