import { Checkbox, CheckboxGroup } from "@avaya/neo-react";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";

import {
  categoriesToFilterFor,
  themesToFilterFor,
  variationsToFilterFor,
} from "./helpers/iconPageState";

import "./IconFilters.css";

export function updateFilteredArray(array: string[], value: string) {
  let tempArray = [];

  if (array.includes(value)) {
    tempArray = array.filter((values) => values !== value);
  } else {
    tempArray = array;
    tempArray.push(value);
  }

  return tempArray;
}

export const IconFilters = ({ categories }: { categories: string[] }) => {
  const filteredCategories = useStore(categoriesToFilterFor);

  const filteredVariations = useStore(variationsToFilterFor);

  const filteredThemes = useStore(themesToFilterFor);

  return (
    <div className="icon-filters">
      <section className="icon-filters__section">
        <label
          className="icon-filters__section__label"
          id="categories"
          htmlFor="Icon categories"
        >
          Categories
        </label>

        <CheckboxGroup
          groupName="Icon categories"
          aria-labelledby="categories"
          onChange={(e) => {
            const { value: category } = e.target as HTMLInputElement;

            let tempFilteredCategories = updateFilteredArray(
              filteredCategories,
              category
            );

            categoriesToFilterFor.set([...tempFilteredCategories]);
          }}
        >
          {categories.map((category, index) => (
            <Checkbox value={category} key={index}>
              {category}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </section>
      <section className="icon-filters__section">
        <label
          className="icon-filters__section__label"
          id="variations"
          htmlFor="Icon variations"
        >
          Variations
        </label>

        <CheckboxGroup
          groupName="Icon variations"
          aria-labelledby="variations"
          onChange={(e) => {
            const { value: variation } = e.target as HTMLInputElement;

            let tempFilteredVariations = updateFilteredArray(
              filteredVariations,
              variation
            );

            variationsToFilterFor.set(tempFilteredVariations);
          }}
        >
          <Checkbox value="bidirectional">Bidirectional</Checkbox>
          <Checkbox value="animated">Animated</Checkbox>
        </CheckboxGroup>
      </section>
      <section className="icon-filters__section">
        <label
          className="icon-filters__section__label"
          id="themes"
          htmlFor="Icon themes"
        >
          Theme
        </label>

        <CheckboxGroup
          groupName="Icon themes"
          aria-labelledby="themes"
          onChange={(e) => {
            const { value: theme } = e.target as HTMLInputElement;

            let tempFilteredThemes = updateFilteredArray(filteredThemes, theme);

            themesToFilterFor.set(tempFilteredThemes);
          }}
        >
          <Checkbox value="light">Light</Checkbox>
          <Checkbox value="dark">Dark</Checkbox>
        </CheckboxGroup>
      </section>
    </div>
  );
};
