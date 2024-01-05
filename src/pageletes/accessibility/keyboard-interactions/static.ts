import type { TopicsDict } from "components";

type KeyboardInteractionsTopicNames =
  | "accordion"
  | "buttons"
  | "breadcrumb"
  | "checkbox"
  | "chip"
  | "dropbown"
  | "header"
  | "list"
  | "modal"
  | "notifications"
  | "pagination"
  | "radio"
  | "select"
  | "sheet"
  | "sidenavigation"
  | "stepper"
  | "switch"
  | "table"
  | "tabs"
  | "textinput"
  | "tooltip"
  | "treeview"
  | "widget";

const component = "testing-tools";
export const topics: TopicsDict<KeyboardInteractionsTopicNames> = {
  accordion: {
    order: 0,
    id: `${component}-accordion`,
    title: "Accordion",
  },
  buttons: {
    order: 1,
    id: `${component}-buttons`,
    title: "Buttons",
  },
  breadcrumb: {
    order: 2,
    id: `${component}-breadcrumb`,
    title: "Breadcrumb",
  },
  checkbox: {
    order: 3,
    id: `${component}-checkbox`,
    title: "Checkbox",
  },
  chip: {
    order: 4,
    id: `${component}-chip`,
    title: "Chip",
  },
  dropbown: {
    order: 5,
    id: `${component}-dropbown`,
    title: "Dropbown",
  },
  header: {
    order: 6,
    id: `${component}-header`,
    title: "Header",
  },
  list: {
    order: 7,
    id: `${component}-list`,
    title: "List",
  },
  modal: {
    order: 8,
    id: `${component}-modal`,
    title: "Modal",
  },
  notifications: {
    order: 9,
    id: `${component}-Notifications`,
    title: "Notifications",
  },
  pagination: {
    order: 10,
    id: `${component}-pagination`,
    title: "Pagination",
  },
  radio: {
    order: 11,
    id: `${component}-radio`,
    title: "Radio",
  },
  select: {
    order: 12,
    id: `${component}-select`,
    title: "Select",
  },
  sheet: {
    order: 13,
    id: `${component}-sheet`,
    title: "Sheet",
  },
  sidenavigation: {
    order: 14,
    id: `${component}-sidenavigation`,
    title: "Side Navigation",
  },
  // stepper: {
  //   order: 15,
  //   id: `${component}-stepper`,
  //   title: "Stepper",
  // },
  switch: {
    order: 16,
    id: `${component}-switch`,
    title: "Switch",
  },
  table: {
    order: 17,
    id: `${component}-table`,
    title: "Table",
  },
  tabs: {
    order: 18,
    id: `${component}-tabs`,
    title: "Tabs",
  },
  textinput: {
    order: 19,
    id: `${component}-textinput`,
    title: "Text Input",
  },
  tooltip: {
    order: 20,
    id: `${component}-tooltip`,
    title: "Tooltip",
  },
  treeview: {
    order: 21,
    id: `${component}-treeview`,
    title: "Tree View",
  },
  widget: {
    order: 22,
    id: `${component}-widget`,
    title: "Widget",
  },
};
