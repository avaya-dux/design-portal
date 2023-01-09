import { IconCategory } from "./IconCategory";

import { icons } from "./helpers/icons";
import Fuse from "fuse.js";

import {
  categoriesToFilterFor,
  themesToFilterFor,
} from "./helpers/iconPageState";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";
import { searchFor } from "./helpers/iconPageState";

import styles from "./IconLibrary.module.css";
import { Chip } from "@avaya/neo-react";

export const IconLibrary = ({ allCategories }: { allCategories: string[] }) => {
  const [iconCategoriesToDisplay, setIconCategoriesToDisplay] =
    useState<string[]>(allCategories);

  const [totalNumberOfIconsDisplayed, setTotalNumberOfIconsDisplayed] =
    useState<number>(icons.length);

  const filteredCategories = useStore(categoriesToFilterFor);
  const filteredTheme = useStore(themesToFilterFor);

  const searchIconNameFor = useStore(searchFor);

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
    let iconSearchResults = icons;
    if (searchIconNameFor.length > 0) {
      const options = {
        useExtendedSearch: true,
        threshohld: 0.1,
        findAllMatches: true,
        keys: ["name"],
      };

      const fuse = new Fuse(icons, options);
      iconSearchResults = fuse
        .search(searchIconNameFor)
        .map((icon) => icon.item);
    }

    if (filteredCategories.length) {
      setTotalNumberOfIconsDisplayed(
        iconSearchResults.filter((icon) =>
          filteredCategories.includes(icon.category)
        ).length
      );
    } else {
      setTotalNumberOfIconsDisplayed(iconSearchResults.length);
    }
  }, [filteredCategories, searchIconNameFor]);

  const totalNumberOfIconsDisplayedString = `${totalNumberOfIconsDisplayed} icons displayed`;

  return (
    <div className={`${styles["icon-library"]} neo-${filteredTheme}`}>
      <Chip
        variant="default"
        role="alert"
        aira-live="assertive"
        className={styles["icon-library__alert"]}
      >
        {totalNumberOfIconsDisplayedString}
      </Chip>
      {iconCategoriesToDisplay.map((category, index) => (
        <IconCategory category={category} key={index} />
      ))}
    </div>
  );
};
