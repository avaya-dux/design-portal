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
  | "states"
  | "type"
  | "behavior"
  | "usingIcons"
  | "specs"
  | "keyboard";

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
  states: {
    order: 2,
    id: "button-states",
    title: "States",
  },
  type: {
    order: 3,
    id: "button-type",
    title: "Type",
  },
  behavior: {
    order: 5,
    id: "button-behavior",
    title: "Behavior",
  },
  usingIcons: {
    order: 6,
    id: "button-using-icons",
    title: "Buttons Using Icons",
  },
  specs: {
    order: 7,
    id: "button-specs",
    title: "Specs",
  },
  keyboard: {
    order: 8,
    id: "button-keyboard-interactions",
    title: "Keyboard Interactions",
  },
};
