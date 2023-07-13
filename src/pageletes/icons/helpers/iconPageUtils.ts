import Fuse from "fuse.js";
import type { IconProps } from "./iconType";

export const findIcons = (
  icons: IconProps[],
  searchFor: string,
): IconProps[] => {
  let iconSearchResults = icons;
  if (searchFor.length > 0) {
    const searchName = `'${searchFor}`; // single quote prefix specifies partial matches
    const options = {
      useExtendedSearch: true,
      threshohld: 0.1,
      findAllMatches: true,
      keys: ["name"],
    };

    const fuse = new Fuse(icons, options);
    iconSearchResults = fuse.search(searchName).map((icon) => icon.item);
  }

  return iconSearchResults;
};

export const filterIconsWithVariations = (
  icons: IconProps[],
  filteredVariations: string[],
): IconProps[] => {
  let iconsWithVariations = icons;
  if (filteredVariations.length) {
    if (
      filteredVariations.includes("bidirectional") &&
      filteredVariations.includes("animated")
    ) {
      iconsWithVariations = icons.filter(
        (icon) => icon.bidirectional && icon.animated,
      );
    } else {
      if (filteredVariations.includes("animated")) {
        iconsWithVariations = icons.filter((icon) => icon.animated);
      }

      if (filteredVariations.includes("bidirectional")) {
        iconsWithVariations = icons.filter((icon) => icon.bidirectional);
      }
    }
  }

  return iconsWithVariations;
};
