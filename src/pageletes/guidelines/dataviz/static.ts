import type { TopicsDict } from "components";

type DataVizTopicNames =
  | "guidelines"
  | "linecharts"
  | "barcharts"
  | "piecharts";

export const topics: TopicsDict<DataVizTopicNames> = {
  guidelines: {
    order: 0,
    id: "dataviz-guidelines",
    title: "Common Guidelines",
  },
  linecharts: { order: 1, id: "dataviz-line-charts", title: "Line Charts" },
  barcharts: {
    order: 2,
    id: "dataviz-bar-charts",
    title: "Bar Charts",
  },
  piecharts: {
    order: 3,
    id: "dataviz-pie-charts",
    title: "Pie Charts",
  },
};
