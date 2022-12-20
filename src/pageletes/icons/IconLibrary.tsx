import { IconCategory } from "./IconCategory";

import { categoriesToFilterFor } from "./helpers/iconPageState";
import { useStore } from "@nanostores/react";
import { Fragment, useEffect, useState } from "react";

export const IconLibrary = ({ categories }: { categories: string[] }) => {
  const [iconCategoriesToDisplay, setIconCategoriesToDisplay] =
    useState<string[]>(categories);

  const filteredCategories = useStore(categoriesToFilterFor);

  useEffect(() => {
    if (!filteredCategories.length) {
      setIconCategoriesToDisplay(categories);
      return;
    }

    // need to reset filter

    let tempArray = [...filteredCategories].sort((a, b) => (a > b ? 1 : -1));

    setIconCategoriesToDisplay([...tempArray]);
  }, [filteredCategories]);

  return (
    <div>
      {iconCategoriesToDisplay.map((category, index) => (
        <Fragment key={index}>
          <IconCategory category={category} />
        </Fragment>
      ))}
    </div>
  );
};
