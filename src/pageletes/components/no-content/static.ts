import type { TopicsDict } from "components";

export const defaultHtml = `<div class="neo-empty-state">
  <p class="neo-icon-info">No Content</p>
</div>`;
export const defaultReact = "<NoContent />";
export const sandbox =
  "https://codesandbox.io/s/neo-react-no-content-9s0ek0?file=/src/App.js";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-no-content";

type NoContentTopicNames = "playground";

export const topics: TopicsDict<NoContentTopicNames> = {
  playground: {
    order: 0,
    id: "no-content-playground",
    title: "Interactive Playground",
  },
};
