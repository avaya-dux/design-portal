import { IconCategory } from "./IconCategory";

import {
  categoriesToFilterFor,
  themesToFilterFor,
} from "./helpers/iconPageState";
import { useStore } from "@nanostores/react";
import { Fragment, useEffect, useState } from "react";

import "./IconLibrary.css";

export const IconLibrary = ({ categories }: { categories: string[] }) => {
  const [iconCategoriesToDisplay, setIconCategoriesToDisplay] =
    useState<string[]>(categories);

  const filteredCategories = useStore(categoriesToFilterFor);
  const filteredTheme = useStore(themesToFilterFor);

  useEffect(() => {
    if (!filteredCategories.length) {
      setIconCategoriesToDisplay(categories);
      return;
    }

    const tempArray = [...filteredCategories].sort((a, b) => (a > b ? 1 : -1));

    setIconCategoriesToDisplay([...tempArray]);
  }, [filteredCategories, categories]);

  return (
    <div className={`icon-library neo-${filteredTheme}`}>
      {iconCategoriesToDisplay.map((category, index) => (
        <Fragment key={index}>
          <IconCategory category={category} />
        </Fragment>
      ))}
    </div>
  );
};
