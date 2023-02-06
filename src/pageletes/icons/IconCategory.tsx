import { Icon } from "@avaya/neo-react";
import { useStore } from "@nanostores/react";
import { useEffect, useMemo, useState } from "react";

import { searchFor, variationsToFilterFor } from "./helpers/iconPageState";
import { icons } from "./helpers/icons";

import type { IconProps } from "./helpers/iconType";
import { filterIconsWithVariations, findIcons } from "./helpers/iconPageUtils";

import styles from "./IconCategory.module.css";

export const IconCategory = ({ category }: { category: string }) => {
  const searchIconNameFor = useStore(searchFor);

  const allIconsInCategory = useMemo(() => {
    const iconSearchResults = findIcons(icons, searchIconNameFor);

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

    const filteredIcons: IconProps[] = filterIconsWithVariations(
      allIconsInCategory,
      filteredVariations
    );

    setIconsToDisplay([...filteredIcons]);
  }, [filteredVariations, allIconsInCategory]);

  return iconsToDisplay.length ? (
    <div className={styles["icon-category"]}>
      <p>{category}</p>
      <div
        className={
          iconsToDisplay.length
            ? styles["icon-category__icons--grid"]
            : styles["icon-category__icons--flex"]
        }
      >
        {iconsToDisplay.map((icon, index) => (
          <div className={styles["icon-category__icons__card"]} key={index}>
            <Icon icon={icon.name} aria-label={`${icon.name} icon`} size="lg" />
            <p>{icon.name}</p>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div>No Icons</div>
  );
};
