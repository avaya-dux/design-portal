import type { IconType } from "@avaya/neo-react";
import Fuse from "fuse.js";

export const findIcons = (icons: IconType[], searchFor: string): IconType[] => {
	if (!searchFor) {
		return icons;
	}

	const fuse = new Fuse(icons, {
		useExtendedSearch: true,
		threshold: 0.1,
		findAllMatches: true,
		keys: ["name"],
	});

	const searchName = `'${searchFor}`; // single quote prefix specifies partial matches
	return fuse.search(searchName).map((icon) => icon.item);
};

export const filterIconsWithVariations = (
	icons: IconType[],
	filteredVariations: string[],
): IconType[] => {
	if (
		filteredVariations.includes("bidirectional") &&
		filteredVariations.includes("animated")
	) {
		return icons.filter((icon) => icon.bidirectional && icon.animated);
	} else if (filteredVariations.includes("animated")) {
		return icons.filter((icon) => icon.animated);
	} else if (filteredVariations.includes("bidirectional")) {
		return icons.filter((icon) => icon.bidirectional);
	}

	return icons;
};
