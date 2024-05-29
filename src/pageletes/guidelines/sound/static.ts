import type { TopicsDict } from "components";

type SoundTopicNames = "types" | "whenToUse" | "whenNotToUse";

export const topics: TopicsDict<SoundTopicNames> = {
	types: {
		order: 0,
		id: "sound-types",
		title: "Types",
	},
	whenToUse: { order: 1, id: "sound-when-to-use", title: "When To Use" },
	whenNotToUse: {
		order: 2,
		id: "sound-when-not-to-use",
		title: "When Not To Use",
	},
};
