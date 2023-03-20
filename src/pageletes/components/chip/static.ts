import type { TopicsDict } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

export const defaultHtml = prettyPrintHtml(`
<div class="neo-chips">
  <div class="neo-chip neo-chip--default neo-chips__item">This</div>
  <div class="neo-chip neo-chip--success neo-chips__item">is</div>
  <div class="neo-chip neo-chip--info neo-chips__item">a</div>
  <div class="neo-chip neo-chip--alert neo-chips__item">placeholder</div>
  <div class="neo-chip neo-chip--warning neo-chips__item">example</div>
</div>
`);
export const defaultReact = prettyPrintReact(`
<ChipsContainer>
  <Chip variant="default">This</Chip>
  <Chip variant="success">is</Chip>
  <Chip variant="info">a</Chip>
  <Chip variant="alert">placeholder</Chip>
  <Chip variant="warning">example</Chip>
</ChipsContainer>
`);

export const sandbox = "https://codesandbox.io/s/neo-react-chips-conoc3";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-chips";

type ChipTopicNames =
  | "playground"
  | "anatomy"
  | "states"
  | "type"
  | "behavior"
  | "specs"
  | "keyboard"
  | "related";

const component = "chip";

export const topics: TopicsDict<ChipTopicNames> = {
  playground: {
    order: 0,
    id: `${component}-playground`,
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: `${component}-anatomy`, title: "Anatomy" },
  states: { order: 2, id: `${component}-states`, title: "States" },
  type: { order: 3, id: `${component}-type`, title: "Type" },
  behavior: {
    order: 4,
    id: `${component}-behavior`,
    title: "Behavior",
  },
  specs: { order: 5, id: `${component}-specs`, title: "Specs" },
  keyboard: {
    order: 6,
    id: `${component}-keyboard-interactions`,
    title: "Keyboard Interactions",
  },
  related: {
    order: 7,
    id: `${component}-related-content`,
    title: "Related Content",
  },
};
