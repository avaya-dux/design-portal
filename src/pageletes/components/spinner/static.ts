import type { TopicsDict } from "components";

export const defaultHtml = `<div class="neo-spinner"></div>`;
export const defaultReact = `<Spinner />`;
export const sandbox = "https://codesandbox.io/s/neo-react-spinner-yj5o5i";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-spinner--default";

type SpinnerTopicNames = "playground";

export const topics: TopicsDict<SpinnerTopicNames> = {
  playground: {
    order: 0,
    id: "spinner-playground",
    title: "Interactive Playground",
  },
};
