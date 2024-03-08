import {
  Checkbox,
  CheckboxGroup,
  IconButton,
  Radio,
  RadioGroup,
} from "@avaya/neo-react";
import { useStore } from "@nanostores/react";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

import { themesToFilterFor } from "components/react/utils/layoutState";

import {
  categoriesToFilterFor,
  variationsToFilterFor,
} from "./helpers/iconPageState";
import styles from "./IconFilters.module.css";

export function updateFilteredArray(array: string[], value: string) {
  let categoriesToFilter = [];

  if (array.includes(value)) {
    categoriesToFilter = array.filter((values) => values !== value);
  } else {
    categoriesToFilter = array;
    categoriesToFilter.push(value);
  }

  return categoriesToFilter;
}

export const IconFilters = ({ categories }: { categories: string[] }) => {
  const filteredCategories = useStore(categoriesToFilterFor);

  const filteredVariations = useStore(variationsToFilterFor);

  const filteredTheme = useStore(themesToFilterFor);

  const [isIconFiltersOpen, setIsIconFiltersOpen] = useState(false);

  const [showAllCategories, setShowAllCategories] =
    useState<string>("selectAll");

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (isIconFiltersOpen && event.key === "Escape") {
        setIsIconFiltersOpen(false);
      }
    },
    [isIconFiltersOpen],
  );

  useEffect(() => {
    if (showAllCategories) {
      categoriesToFilterFor.set([]);
    }
  }, [showAllCategories]);

  useEffect(() => {
    if (filteredCategories.length) {
      setShowAllCategories("");
    } else {
      setShowAllCategories("selectAll");
    }
  }, [filteredCategories]);

  useEffect(() => {
    return () => {
      categoriesToFilterFor.set([]);
      variationsToFilterFor.set([]);
      themesToFilterFor.set("dynamic");
    };
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <aside
        className={clsx(
          styles["icon-filters"],
          isIconFiltersOpen
            ? styles["icon-filters--active"]
            : styles["icon-filters--hidden"],
        )}
      >
        <div className={styles["icon-filters__toggle"]}>
          <IconButton
            aria-label="Toggle filters"
            icon={isIconFiltersOpen ? "close" : "preferences"}
            variant="tertiary"
            onClick={() => setIsIconFiltersOpen(!isIconFiltersOpen)}
          />
          <p className="neo-body-regular">Filter</p>
        </div>

        <section className={styles["icon-filters__section"]}>
          <label
            className={styles["icon-filters__section__label"]}
            id="categories"
            htmlFor="Icon categories"
          >
            Categories
          </label>

          <RadioGroup
            groupName="selectAll"
            selected={showAllCategories}
            onChange={(e) => {
              const { value: selectAll } = e.target as HTMLInputElement;

              setShowAllCategories(selectAll);
            }}
          >
            <Radio value="selectAll"> Select All</Radio>
          </RadioGroup>

          <CheckboxGroup
            groupName="Icon categories"
            aria-labelledby="categories"
            onChange={(e) => {
              const { value: category } = e.target as HTMLInputElement;

              const tempFilteredCategories = updateFilteredArray(
                filteredCategories,
                category,
              );

              categoriesToFilterFor.set([...tempFilteredCategories]);
            }}
          >
            {categories.map((category, index) => (
              <Checkbox
                value={category}
                key={index}
                checked={filteredCategories.includes(category)}
              >
                {category}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </section>

        <section className={styles["icon-filters__section"]}>
          <label
            className={styles["icon-filters__section__label"]}
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

              const tempFilteredVariations = updateFilteredArray(
                filteredVariations,
                variation,
              );

              variationsToFilterFor.set([...tempFilteredVariations]);
            }}
          >
            <Checkbox value="bidirectional">Bidirectional</Checkbox>
            <Checkbox value="animated">Animated</Checkbox>
          </CheckboxGroup>
        </section>

        <section className={styles["icon-filters__section"]}>
          <label
            className={styles["icon-filters__section__label"]}
            id="themes"
            htmlFor="Icon themes"
          >
            Theme
          </label>

          <RadioGroup
            groupName="type-options"
            selected={filteredTheme}
            onChange={(e) => {
              const { value: theme } = e.target as HTMLInputElement;

              themesToFilterFor.set(theme);
            }}
          >
            <Radio value="light">Light</Radio>
            <Radio value="dark">Dark</Radio>
          </RadioGroup>
        </section>
      </aside>
      <div
        className={styles["icon-filters__scrim"]}
        id="icon-filter-scrim"
        onClick={() => setIsIconFiltersOpen(false)}
        role="presentation"
      ></div>
    </>
  );
};
