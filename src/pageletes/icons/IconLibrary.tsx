import { IconCategory } from "./IconCategory";

import { icons } from "./helpers/icons";
import { filterIconsWithVariations, findIcons } from "./helpers/iconPageUtils";

import clsx from "clsx";

import {
  categoriesToFilterFor,
  variationsToFilterFor,
} from "./helpers/iconPageState";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { searchFor } from "./helpers/iconPageState";

import styles from "./IconLibrary.module.css";
import { Chip } from "@avaya/neo-react";

const NoIconsFoundMessage = () => (
  <p className={clsx(styles["icon-library__no-icons"], "neo-icon-error")}>
    No icons to display with current selections
  </p>
);

export const IconLibrary = ({ allCategories }: { allCategories: string[] }) => {
  const [iconCategoriesToDisplay, setIconCategoriesToDisplay] =
    useState<string[]>(allCategories);

  const [totalNumberOfIconsDisplayed, setTotalNumberOfIconsDisplayed] =
    useState<number>(icons.length);

  const filteredCategories = useStore(categoriesToFilterFor);

  const searchIconNameFor = useStore(searchFor);
  const filteredVariations = useStore(variationsToFilterFor);

  useEffect(() => {
    if (!filteredCategories.length) {
      setIconCategoriesToDisplay(allCategories);
      return;
    }

    const newCategories = [...filteredCategories].sort((a, b) =>
      a > b ? 1 : -1
    );

    setIconCategoriesToDisplay([...newCategories]);
  }, [filteredCategories, allCategories]);

  useEffect(() => {
    const iconsWithVariations = filterIconsWithVariations(
      icons,
      filteredVariations
    );

    const iconSearchResults = findIcons(iconsWithVariations, searchIconNameFor);

    if (filteredCategories.length) {
      setTotalNumberOfIconsDisplayed(
        iconSearchResults.filter((icon) =>
          filteredCategories.includes(icon.category)
        ).length
      );
    } else {
      setTotalNumberOfIconsDisplayed(iconSearchResults.length);
    }
  }, [filteredCategories, searchIconNameFor, filteredVariations]);

  const totalNumberOfIconsDisplayedString = `${totalNumberOfIconsDisplayed} icons displayed`;

  return (
    <div className={`${styles["icon-library"]}`}>
      <Chip
        variant="default"
        role="alert"
        aira-live="assertive"
        className={styles["icon-library__alert"]}
      >
        {totalNumberOfIconsDisplayedString}
      </Chip>
      {totalNumberOfIconsDisplayed ? (
        iconCategoriesToDisplay.map((category, index) => (
          <IconCategory category={category} key={index} />
        ))
      ) : (
        <NoIconsFoundMessage />
      )}
    </div>
  );
};
