import type { TopicsDict } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

export const sandbox = "https://codesandbox.io/s/neo-react-radio-group-d5l4uz";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-radio-group";

export const defaultHtml = prettyPrintHtml(`
<form class="neo-form">
  <div class="neo-form-control">
    <div class="neo-input-group">
      <label for="Default Radio Group">Select Option</label>
      <input
        class="neo-radio"
        type="radio"
        name="Default Radio Group"
        value="Calendar"
        id="calendar"
        role="radio"
        aria-checked="false"
      />
      <label for="calendar">Calendar</label>
      <input
        class="neo-radio"
        type="radio"
        name="Default Radio Group"
        value="Calculator"
        id="calculator"
        role="radio"
        aria-checked="false"
      />
      <label for="calculator">Calculator</label>
      <input
        class="neo-radio"
        type="radio"
        name="Default Radio Group"
        value="Notes"
        id="notes"
        role="radio"
        aria-checked="false"
      />
      <label for="notes">Notes</label>
    </div>
  </div>
</form>
  `);

export const defaultReact = prettyPrintReact(`
<Form id="radio-form">
  <RadioGroup
    groupName="Default Radio Group"
    label="Select Option"
  >
    <Radio value="Calendar">Calendar</Radio>
    <Radio value="Calculator">Calculator</Radio>
    <Radio value="Notes">Notes</Radio>
  </RadioGroup>
</Form>
  `);

type DropdownTopicNames =
  | "anatomy"
  | "states"
  | "behavior"
  | "content-overflow"
  | "text-alignment"
  | "category-labels"
  | "specs"
  | "keyboard"
  | "playground"
  | "related";

export const topics: TopicsDict<DropdownTopicNames> = {
  playground: {
    order: 0,
    id: "radiogroup-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "radiogroup-anatomy", title: "Anatomy" },
  states: { order: 2, id: "radiogroup-states", title: "States" },
  behavior: { order: 5, id: "radiogroup-behavior", title: "Behavior" },
  "content-overflow": {
    order: 6,
    id: "radiogroup-content-overflow",
    title: "Content Overflow",
  },
  "text-alignment": {
    order: 7,
    id: "radiogroup-text-alignment",
    title: "Text Alignment",
  },
  "category-labels": {
    order: 8,
    id: "radiogroup-category-labels",
    title: "Category Labels",
  },
  specs: { order: 9, id: "radiogroup-specs", title: "Specs" },
  keyboard: {
    order: 10,
    id: "radiogroup-keyboard-interactions",
    title: "Keyboard Interactions",
  },
  related: {
    order: 11,
    id: "radiogroup-related-content",
    title: "Related Content",
  },
};
