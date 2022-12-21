import { IconCategory } from "./IconCategory";

import { icons } from "./helpers/icons";

import {
  categoriesToFilterFor,
  themesToFilterFor,
} from "./helpers/iconPageState";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

import styles from "./IconLibrary.module.css";
import { Chip } from "@avaya/neo-react";

export const IconLibrary = ({ allCategories }: { allCategories: string[] }) => {
  const [iconCategoriesToDisplay, setIconCategoriesToDisplay] =
    useState<string[]>(allCategories);

  const [totalNumberOfIconsDisplayed, setTotalNumberOfIconsDisplayed] =
    useState<number>(icons.length);

  const filteredCategories = useStore(categoriesToFilterFor);
  const filteredTheme = useStore(themesToFilterFor);

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
    if (filteredCategories.length) {
      setTotalNumberOfIconsDisplayed(
        icons.filter((icon) => filteredCategories.includes(icon.category))
          .length
      );
    } else {
      setTotalNumberOfIconsDisplayed(icons.length)
    }
  }, [filteredCategories]);

  let totalNumberOfIconsDisplayedString = `${totalNumberOfIconsDisplayed} icons displayed`

  return (
    <div className={`${styles["icon-library"]} neo-${filteredTheme}`}>
      <Chip variant="default" role="alert" aira-live="assertive" className={styles["icon-library__alert"]}>{totalNumberOfIconsDisplayedString}</Chip>
      {iconCategoriesToDisplay.map((category, index) => (
        <IconCategory category={category} key={index} />
      ))}
    </div>
  );
};
