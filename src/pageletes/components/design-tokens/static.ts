import type { TopicsDict } from "components";

type DesignTokensTopicNames =
	| "color"
	| "typography"
	| "spacers"
	| "borders"
	| "interactivity"
	| "elevation";

const component = "design-tokens";
export const topics: TopicsDict<DesignTokensTopicNames> = {
	color: {
		order: 0,
		id: `${component}-color`,
		title: "Color",
	},
	typography: {
		order: 1,
		id: `${component}-typography`,
		title: "Typography",
	},
	spacers: {
		order: 2,
		id: `${component}-spacers`,
		title: "Spacers",
	},
	borders: {
		order: 3,
		id: `${component}-borders`,
		title: "Borders",
	},
	interactivity: {
		order: 4,
		id: `${component}-interactivity`,
		title: "Interactivity",
	},
	elevation: {
		order: 5,
		id: `${component}-elevation`,
		title: "Elevation",
	},
};
