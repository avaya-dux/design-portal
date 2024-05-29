import type { TopicsDict } from "components";

type VoiceToneTopicNames = "mood" | "language" | "points" | "summary";

const page = "voice-tone";
export const topics: TopicsDict<VoiceToneTopicNames> = {
	mood: {
		order: 0,
		id: `${page}-setting-mood`,
		title: "Setting the Mood: How We Talk",
	},
	language: {
		order: 1,
		id: `${page}-language-mechanics`,
		title: "Language Mechanics: Dotting the i's and Crossing the t's",
	},
	points: {
		order: 2,
		id: `${page}-points`,
		title: "Points to Consider",
	},
	summary: {
		order: 3,
		id: `${page}-summary`,
		title: "In Summary",
	},
};
