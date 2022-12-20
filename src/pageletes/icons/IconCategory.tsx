import { icons } from "./helpers/icons";
import { Icon } from "@avaya/neo-react";

import {
  categoriesToFilterFor,
  variationsToFilterFor,
  themesToFilterFor,
} from "./helpers/iconPageState";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

import type { IconProps } from "./helpers/iconType";

import "./IconCategory.css";

export const IconCategory = ({ category }: { category: string }) => {
  const [iconsToDisplay, setIconsToDisplay] = useState<IconProps[]>([]);

  const filteredCategories = useStore(categoriesToFilterFor);
  const filteredVariations = useStore(variationsToFilterFor);
  const filteredThemes = useStore(themesToFilterFor);


  useEffect(() => {

    setIconsToDisplay(
      icons
        .filter((icon) => icon.category === category)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
    );

  }, [])

  return (
    <div className="icon-category">
      <h4>{category}</h4>
      <div className="icon-category__icons">
        {iconsToDisplay.map((icon, index) => (
          <div className="icon-category__icons__card" key={index}>
            <Icon icon={icon.name} aria-label={`${icon.name} icon`} size="lg" />
            <p>{icon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
