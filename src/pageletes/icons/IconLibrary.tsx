import { IconCategory } from "./IconCategory";

import {
  categoriesToFilterFor,
  themesToFilterFor,
} from "./helpers/iconPageState";
import { useStore } from "@nanostores/react";
import { Fragment, useEffect, useState } from "react";

import styles from "./IconLibrary.module.css";

export const IconLibrary = ({ allCategories }: { allCategories: string[] }) => {
  const [iconCategoriesToDisplay, setIconCategoriesToDisplay] =
    useState<string[]>(allCategories);

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

  return (
    <div className={`${styles["icon-library"]} neo-${filteredTheme}`}>
      {iconCategoriesToDisplay.map((category, index) => (
        <IconCategory category={category} key={index} />
      ))}
    </div>
  );
};
