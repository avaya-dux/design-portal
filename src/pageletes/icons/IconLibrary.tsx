import { IconCategory } from "./IconCategory";

import {
  categoriesToFilterFor,
  themesToFilterFor,
} from "./helpers/iconPageState";
import { useStore } from "@nanostores/react";
import { Fragment, useEffect, useState } from "react";

import "./IconLibrary.css";

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

    const tempArray = [...filteredCategories].sort((a, b) => (a > b ? 1 : -1));

    setIconCategoriesToDisplay([...tempArray]);
  }, [filteredCategories, allCategories]);

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
