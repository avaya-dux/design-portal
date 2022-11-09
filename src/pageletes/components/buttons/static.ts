import type { TopicsDict } from "components";

export const defaultHtml = `<button class="neo-btn neo-btn-primary neo-btn-primary--default">
  default
</button>
`;
export const defaultReact = `<Button>default</Button>`;
export const sandbox = "https://codesandbox.io/s/neo-react-button-qoluzy";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-button";

type ButtonsTopicNames =
  | "playground"
  | "anatomy"
  | "textLabel"
  | "arrangement"
  | "states"
  | "type";

export const topics: TopicsDict<ButtonsTopicNames> = {
  playground: {
    order: 0,
    id: "button-playground",
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: "anatomy-playground",
    title: "Anatomy",
  },
  type: {
    order: 2,
    id: "button-type",
    title: "Type",
  },
  textLabel: {
    order: 3,
    id: "text-label-playground",
    title: "Text Label",
  },
  states: {
    order: 4,
    id: "button-states",
    title: "States",
  },
  arrangement: {
    order: 5,
    id: "arrangement-playground",
    title: "Arrangement",
  },
};
