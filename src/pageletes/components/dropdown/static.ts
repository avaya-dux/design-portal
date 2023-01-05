import type { TopicsDict } from "components";
import { prettyPrintHtml, prettyPrintReact } from "helpers";

export const defaultHtml = prettyPrintHtml(`
<div class="neo-dropdown neo-dropdown--active">
  <button
    class="neo-btn neo-btn-primary neo-btn-primary--primary neo-dropdown__link-header"
  >
    Open Menu
  </button>
  <div class="neo-dropdown__content" role="menu">
    <a class="neo-dropdown__link" role="menuitem">Menu Item 1</a>
    <a class="neo-dropdown__link" role="menuitem">Menu Item 2</a>
    <a class="neo-dropdown__link">Menu Item 3</a>
  </div>
</div>
`);

export const defaultReact = prettyPrintReact(`
<Menu menuRootElement={<Button>Open Menu</Button>}>
    <MenuItem>Menu Item 1</MenuItem>
    <MenuItem>Menu Item 2</MenuItem>
    <MenuItem>Menu Item 3</MenuItem>
</Menu>
`);

export const sandbox = "#";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-menu--simple-menu";

type DropdownTopicNames =
  | "anatomy"
  | "states"
  | "positioning"
  | "types"
  | "behavior"
  | "specs"
  | "keyboard"
  | "playground"
  | "related";

export const topics: TopicsDict<DropdownTopicNames> = {
  playground: {
    order: 0,
    id: "dropdown-playground",
    title: "Interactive Playground",
  },
  anatomy: { order: 1, id: "dropdown-anatomy", title: "Anatomy" },
  states: { order: 2, id: "dropdown-states", title: "States" },
  positioning: { order: 3, id: "dropdown-positioning", title: "Positioning" },
  types: {
    order: 4,
    id: "dropdown-types",
    title: "Types",
  },
  behavior: { order: 5, id: "dropdown-behavior", title: "Behavior" },
  specs: { order: 6, id: "dropdown-specs", title: "Specs" },
  keyboard: {
    order: 7,
    id: "dropdown-keyboard-interactions",
    title: "Keyboard Interactions",
  },
  related: {
    order: 7,
    id: "dropdown-related-content",
    title: "Related Content",
  },
};
