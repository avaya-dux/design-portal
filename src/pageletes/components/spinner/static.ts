import type { TopicsDict } from "components";

export const defaultHtml = `<div class="neo-spinner"></div>`;
export const defaultReact = "<Spinner />";
export const sandbox = "https://codesandbox.io/s/neo-react-spinner-yj5o5i";
export const storybook =
	"https://neo-react-library-storybook.netlify.app/?path=/story/components-spinner--default";

type SpinnerTopicNames =
	| "playground"
	| "anatomy"
	| "behavior"
	| "specs"
	| "related";

const component = "spinner";

export const topics: TopicsDict<SpinnerTopicNames> = {
	playground: {
		order: 0,
		id: `${component}-playground`,
		title: "Interactive Playground",
	},
	anatomy: {
		order: 1,
		id: `${component}-anatomy`,
		title: "Anatomy",
	},
	behavior: {
		order: 2,
		id: `${component}-behavior`,
		title: "Behavior",
	},
	specs: {
		order: 3,
		id: `${component}-specs`,
		title: "Specs",
	},
	related: {
		order: 4,
		id: `${component}-related`,
		title: "Related Content",
	},
};
