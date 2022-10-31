import type { TopicsDict } from "components";

export const defaultReact = `<Toast position={"top"} duration={2000}>This is a toast</Toast>`;
export const sandbox = "https://codesandbox.io/s/neo-react-toast-hdlfn9";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-toast--default";

type ToastTopicNames = "playground"


export const topics: TopicsDict<ToastTopicNames> = {
  playground: {
    order: 0,
    id: "toast-playground",
    title: "Interactive Playground",
  },
}
