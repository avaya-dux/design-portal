import { icons } from "./helpers/icons";
import { Icon } from "@avaya/neo-react";

import { variationsToFilterFor } from "./helpers/iconPageState";
import { useStore } from "@nanostores/react";
import { useEffect, useState } from "react";

import type { IconProps } from "./helpers/iconType";

import "./IconCategory.css";

export const IconCategory = ({ category }: { category: string }) => {
  const allIconsInCategory = icons
    .filter((icon) => icon.category === category)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

  const [iconsToDisplay, setIconsToDisplay] =
    useState<IconProps[]>(allIconsInCategory);

  const filteredVariations = useStore(variationsToFilterFor);

  useEffect(() => {
    if (!filteredVariations.length) {
      setIconsToDisplay(allIconsInCategory);
      return;
    }

    let tempArray: IconProps[] = [];

    if (filteredVariations.includes("animated")) {
      tempArray = iconsToDisplay.filter((icon) => icon.animated);
    }

    if (filteredVariations.includes("bidirectional")) {
      tempArray = iconsToDisplay.filter((icon) => icon.bidirectional);
    }

    setIconsToDisplay([...tempArray]);
  }, [filteredVariations]);

  return (
    <div className="icon-category">
      <h4>{category}</h4>
      <div className={iconsToDisplay.length ? "icon-category__icons--grid" : "icon-category__icons--flex"}>
        {iconsToDisplay.length
          ? iconsToDisplay.map((icon, index) => (
              <div className="icon-category__icons__card" key={index}>
                <Icon
                  icon={icon.name}
                  aria-label={`${icon.name} icon`}
                  size="lg"
                />
                <p>{icon.name}</p>
              </div>
            ))
          : [<p className="icon-category__no-icons neo-icon-error">No icons to display with current filters</p>]}
      </div>
    </div>
  );
};
