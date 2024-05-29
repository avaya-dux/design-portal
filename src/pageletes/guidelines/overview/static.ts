import type { TopicsDict } from "components";

type OverviewTopicNames = "overview" | "principles";

export const topics: TopicsDict<OverviewTopicNames> = {
	overview: {
		order: 0,
		id: "overview-overview",
		title: "Overview",
	},
	principles: { order: 1, id: "overview-principles", title: "Principles" },
};
