import type { TopicsDict } from "components";

type LayoutGridTopicNames = "regions" | "gridSystem";

const page = "layout-grid";
export const topics: TopicsDict<LayoutGridTopicNames> = {
  regions: {
    order: 0,
    id: `${page}-regions`,
    title: "Regions",
  },
  gridSystem: {
    order: 1,
    id: `${page}-grid-system`,
    title: "Grid System",
  },
};
