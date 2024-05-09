import type { TopicsDict } from "components";

type StepperTopicNames =
  | "playground"
  | "anatomy"
  | "states"
  | "types"
  | "behavior"
  | "specs"
  | "keyboard";

export const topics: TopicsDict<StepperTopicNames> = {
  playground: {
    order: 0,
    id: "stepper-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "stepper-anatomy", title: "Anatomy" },
  states: { order: 2, id: "stepper-states", title: "States" },
  types: { order: 3, id: "stepper-type", title: "Types" },
  behavior: { order: 4, id: "stepper-behavior", title: "Behavior" },
  specs: {
    order: 5,
    id: "stepper-specs",
    title: "Specs",
  },
  keyboard: {
    order: 6,
    id: "stepper-keyboard",
    title: "Keyboard Interactions",
  },
};
