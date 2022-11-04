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
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-chips-basic-chip";

type ChipTopicNames =
  | "avatar"
  | "basic"
  | "closable"
  | "container"
  | "disabled"
  | "icon"
  | "keyboard"
  | "playground";

export const topics: TopicsDict<ChipTopicNames> = {
  playground: {
    order: 0,
    id: "chips-playground",
    title: "Interactive Playground",
  },
  basic: { order: 1, id: "basic-chips", title: "Basic Chips" },
  disabled: { order: 2, id: "disabled-chips", title: "Disabled Chips" },
  icon: { order: 3, id: "icon-chips", title: "Chips With Icons" },
  closable: {
    order: 4,
    id: "closable-icon-chips",
    title: "Chips With Close Icon",
  },
  avatar: { order: 5, id: "avatar-chips", title: "Chips With Avatar" },
  container: { order: 6, id: "chips-container", title: "Chips Container" },
  keyboard: {
    order: 7,
    id: "chips-keyboard-interactions",
    title: "Keyboard Interactions",
  },
};
