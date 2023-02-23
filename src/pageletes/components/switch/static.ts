import type { TopicsDict } from "components";
import { prettyPrintHtml } from "helpers";

export const defaultHtml = prettyPrintHtml(
  `<div class="neo-form-control">
  <label class="neo-switch" for="switch">
    <input id="switch" type="checkbox" role="switch">
    <i class="neo-switch__icon"></i>
    Option
  </label>
</div>`
);

export const defaultReact = `<Switch>Option</Switch>`;
export const sandbox = "https://codesandbox.io/s/neo-react-switch-eeb2m1";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-switch--default";

type SwitchTopicNames =
  | "playground"
  | "anatomy"
  | "states"
  | "behavior"
  | "specs"
  | "keyboard"
  | "related";

export const topics: TopicsDict<SwitchTopicNames> = {
  playground: {
    order: 0,
    id: "switch-playground",
    title: "Interactive Playground",
  },
  anatomy: {
    order: 1,
    id: "switch-anatomy",
    title: "Anatomy",
  },
  states: {
    order: 2,
    id: "switch-states",
    title: "States",
  },
  behavior: {
    order: 3,
    id: "switch-behavior",
    title: "Behavior",
  },
  specs: {
    order: 4,
    id: "switch-specs",
    title: "Specs",
  },
  keyboard: {
    order: 5,
    id: "switch-keyboard",
    title: "Keyboard Interactions",
  },
  related: {
    order: 6,
    id: "switch-related",
    title: "Related Content",
  },
};
