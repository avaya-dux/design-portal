import { Checkbox, CheckboxGroup } from "@avaya/neo-react";

import { categoriesToFilterFor } from "./iconPageState";

import "./IconFilters.css";
import { useEffect } from "react";
import { useStore } from "@nanostores/react";

interface Icon {
  name: string;
  bidirectional: boolean;
  category: string;
  animated: boolean;
}

export const IconFilters = ({
  categories,
  icons,
}: {
  categories: string[];
  icons: Icon[];
}) => {
  const filteredCategories = useStore(categoriesToFilterFor);

  useEffect(() => {
    console.log(filteredCategories);
  }, [filteredCategories]);

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

            let tempFilteredCategories = filteredCategories;

            if (tempFilteredCategories.includes(category)) {
              tempFilteredCategories = filteredCategories.filter(
                (filtered) => filtered !== category
              )
            } else {
              console.log("This ran")
              tempFilteredCategories.push(category);
            }

            console.log(tempFilteredCategories)

            categoriesToFilterFor.set(tempFilteredCategories);
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
          id="types"
          htmlFor="Icon types"
        >
          Variations
        </label>

        <CheckboxGroup
          groupName="Icon types"
          aria-labelledby="types"
          onChange={(e) => {
            const { value } = e.target as HTMLInputElement;
            console.log(value);
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
            const { value } = e.target as HTMLInputElement;
            console.log(value);
          }}
        >
          <Checkbox value="light">Light</Checkbox>
          <Checkbox value="dark">Dark</Checkbox>
        </CheckboxGroup>
      </section>
    </div>
  );
};
