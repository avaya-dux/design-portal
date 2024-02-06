import type { TopicsDict } from "components";

type KeyboardInteractionsTopicNames =
  | "common"
  | "accordion"
  | "buttons"
  | "breadcrumb"
  | "checkbox"
  | "chip"
  | "dropdown"
  | "header"
  | "link"
  | "list"
  | "modal"
  | "notifications"
  | "pagination"
  | "radio"
  | "select"
  | "sheet"
  | "sidenavigation"
  | "switch"
  | "table"
  | "tabs"
  | "textinput"
  | "tooltip"
  | "treeview"
  | "widget";

const component = "kb";
export const topics: TopicsDict<KeyboardInteractionsTopicNames> = {
  common: {
    order: 0,
    id: `${component}-common`,
    title: "Common Keyboard Interactions",
  },
  accordion: {
    order: 1,
    id: `${component}-accordion`,
    title: "Accordion",
  },
  breadcrumb: {
    order: 2,
    id: `${component}-breadcrumb`,
    title: "Breadcrumb",
  },
  buttons: {
    order: 3,
    id: `${component}-buttons`,
    title: "Buttons",
  },
  checkbox: {
    order: 4,
    id: `${component}-checkbox`,
    title: "Checkbox",
  },
  chip: {
    order: 5,
    id: `${component}-chip`,
    title: "Chip",
  },
  dropdown: {
    order: 6,
    id: `${component}-dropdown`,
    title: "Dropdown",
  },
  header: {
    order: 7,
    id: `${component}-header`,
    title: "Header",
  },
  link: {
    order: 8,
    id: `${component}-link`,
    title: "Link",
  },
  list: {
    order: 9,
    id: `${component}-list`,
    title: "List",
  },
  modal: {
    order: 10,
    id: `${component}-modal`,
    title: "Modal",
  },
  notifications: {
    order: 11,
    id: `${component}-Notifications`,
    title: "Notifications",
  },
  pagination: {
    order: 12,
    id: `${component}-pagination`,
    title: "Pagination",
  },
  radio: {
    order: 13,
    id: `${component}-radio`,
    title: "Radio",
  },
  select: {
    order: 14,
    id: `${component}-select`,
    title: "Select",
  },
  sheet: {
    order: 15,
    id: `${component}-sheet`,
    title: "Sheet",
  },
  sidenavigation: {
    order: 16,
    id: `${component}-sidenavigation`,
    title: "Side Navigation",
  },
  switch: {
    order: 17,
    id: `${component}-switch`,
    title: "Switch",
  },
  table: {
    order: 18,
    id: `${component}-table`,
    title: "Tables",
  },
  tabs: {
    order: 19,
    id: `${component}-tabs`,
    title: "Tabs",
  },
  textinput: {
    order: 20,
    id: `${component}-textinput`,
    title: "Text Input",
  },
  tooltip: {
    order: 21,
    id: `${component}-tooltip`,
    title: "Tooltip",
  },
  treeview: {
    order: 22,
    id: `${component}-treeview`,
    title: "Tree View",
  },
  widget: {
    order: 23,
    id: `${component}-widget`,
    title: "Widget",
  },
};
