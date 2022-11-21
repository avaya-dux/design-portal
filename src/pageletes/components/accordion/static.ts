import type { TopicsDict } from "components";
import { prettyPrintHtml } from "helpers";

export const defaultHtml = prettyPrintHtml(`
<div class="neo-accordion">
  <div class="neo-accordion__item">
    <div
      class="neo-accordion__header"
      role="heading"
      aria-label="Accordion Heading"
      aria-level="2"
    >
      <button
        class="neo-accordion__header-text"
        aria-expanded="true"
        aria-controls="accordion-control-accordion-button"
        id="accordion-button"
      >
        Single Accordion Example
      </button>
    </div>

    <div id="accordion-control-accordion-button" class="neo-accordion__body">
      <div class="neo-accordion__content">
        Inner content of Accordion example
      </div>
    </div>
  </div>
</div>
`);

export const sandbox =
  "https://codesandbox.io/s/neo-react-accodion-m7zsdz?file=/src/App.js";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-accordion";

type AccordionTopicNames =
  | "playground"
  | "anatomy"
  | "states"
  | "usage"
  | "specs"
  | "keyboard"
  | "related";

export const topics: TopicsDict<AccordionTopicNames> = {
  playground: {
    order: 0,
    id: "accordion-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "accordion-anatomy", title: "Anatomy" },
  states: {
    order: 2,
    id: "accordion-states",
    title: "States",
  },
  usage: { order: 3, id: "accordion-usage", title: "Usages" },
  specs: {
    order: 4,
    id: "accordion-specs",
    title: "Specs",
  },
  keyboard: {
    order: 5,
    id: "accordion-keyboard-interactions",
    title: "Keyboard Interactions",
  },
  related: {
    order: 6,
    id: "accordion-related-content",
    title: "Related Content",
  },
};
