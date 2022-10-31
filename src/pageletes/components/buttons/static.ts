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
  textLabel: {
    order: 2,
    id: "text-label-playground",
    title: "Text Label",
  },
  arrangement: {
    order: 3,
    id: "arrangement-playground",
    title: "Arrangement",
  },
  type: {
    order: 4,
    id: "button-type",
    title: "Type",
  },
};
