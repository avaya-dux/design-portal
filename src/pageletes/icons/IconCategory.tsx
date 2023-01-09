import { Icon } from "@avaya/neo-react";
import { useStore } from "@nanostores/react";
import { useEffect, useMemo, useState } from "react";

import { searchFor, variationsToFilterFor } from "./helpers/iconPageState";
import { icons } from "./helpers/icons";

import type { IconProps } from "./helpers/iconType";
import { findIcons } from "./helpers/findIcons";

import styles from "./IconCategory.module.css";

const NoIconsFoundMessage = () => (
  <p className={`${styles["icon-category__no-icons"]} neo-icon-error`}>
    No icons to display with current filters
  </p>
);

export const IconCategory = ({ category }: { category: string }) => {
  const searchIconNameFor = useStore(searchFor);

  const allIconsInCategory = useMemo(() => {
    let iconSearchResults = findIcons(icons, searchIconNameFor);

    return iconSearchResults
      .filter((icon) => icon.category === category)
      .sort((a, b) => (a.name > b.name ? 1 : -1));
  }, [category, searchIconNameFor]);

  const [iconsToDisplay, setIconsToDisplay] =
    useState<IconProps[]>(allIconsInCategory);

  const filteredVariations = useStore(variationsToFilterFor);

  useEffect(() => {
    if (!filteredVariations.length) {
      setIconsToDisplay(allIconsInCategory);
      return;
    }

    let filteredIcons: IconProps[] = [];

    if (filteredVariations.includes("animated")) {
      filteredIcons = allIconsInCategory.filter((icon) => icon.animated);
    }

    if (filteredVariations.includes("bidirectional")) {
      filteredIcons = allIconsInCategory.filter((icon) => icon.bidirectional);
    }

    if (
      filteredVariations.includes("bidirectional") &&
      filteredVariations.includes("animated")
    ) {
      filteredIcons = allIconsInCategory.filter(
        (icon) => icon.bidirectional && icon.animated
      );
    }

    setIconsToDisplay([...filteredIcons]);
  }, [filteredVariations, allIconsInCategory]);

  return (
    <div className={styles["icon-category"]}>
      <p>{category}</p>
      <div
        className={
          iconsToDisplay.length
            ? styles["icon-category__icons--grid"]
            : styles["icon-category__icons--flex"]
        }
      >
        {iconsToDisplay.length ? (
          iconsToDisplay.map((icon, index) => (
            <div className={styles["icon-category__icons__card"]} key={index}>
              <Icon
                icon={icon.name}
                aria-label={`${icon.name} icon`}
                size="lg"
              />
              <p>{icon.name}</p>
            </div>
          ))
        ) : (
          <NoIconsFoundMessage />
        )}
      </div>
    </div>
  );
};
