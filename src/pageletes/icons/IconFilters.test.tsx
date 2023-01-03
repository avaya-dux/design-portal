import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { cleanStores, keepMount } from "nanostores";

import { isLeftNavigationOpen } from "components/react/utils/layoutState";

import {
  categoriesToFilterFor,
  themesToFilterFor,
  variationsToFilterFor,
} from "./helpers/iconPageState";
import { iconCategories } from "./helpers/icons";
import { IconFilters } from "./IconFilters";

describe("Icon filters panel", () => {
  it("renders without exploding", () => {
    render(<IconFilters categories={iconCategories} />);

    const iconFilterPanelElement = screen.getByRole("presentation");

    expect(iconFilterPanelElement).toBeInTheDocument();
  });

  describe("filtering works correctly", () => {
    beforeEach(() => {
      render(<IconFilters categories={iconCategories} />);
    });

    it("filters categories correctly", async () => {
      keepMount(categoriesToFilterFor);

      let categories = categoriesToFilterFor.get();

      expect(categories.length).toBe(0);

      const categoryToFilterFor = iconCategories[0];

      const categoryCheckbox = screen.getByText(categoryToFilterFor as string);

      await userEvent.click(categoryCheckbox);

      categories = categoriesToFilterFor.get();

      expect(categories).toContain(categoryToFilterFor);

      cleanStores(categoriesToFilterFor);
    });

    it("filters variations correctly", async () => {
      keepMount(variationsToFilterFor);

      const variationToFilterFor = "Animated";

      let filteredVariations = variationsToFilterFor.get();

      expect(filteredVariations.length).toBe(0);

      const variationCheckbox = screen.getByText(variationToFilterFor);

      await userEvent.click(variationCheckbox);

      filteredVariations = variationsToFilterFor.get();

      expect(filteredVariations).toContain(variationToFilterFor.toLowerCase());

      cleanStores(variationsToFilterFor);
    });

    it("filters themes correctly", async () => {
      keepMount(themesToFilterFor);

      const themeToFilterFor = "Light";

      const themeCheckbox = screen.getByText(themeToFilterFor);

      await userEvent.click(themeCheckbox);

      const filteredThemes = themesToFilterFor.get();

      expect(filteredThemes).toContain(themeToFilterFor.toLowerCase());

      cleanStores(themesToFilterFor);
    });

    it("resets filtered categories correctly", async () => {
      keepMount(categoriesToFilterFor);

      const categoryToFilterFor = "navigation";

      act(() => {
        categoriesToFilterFor.set([categoryToFilterFor]);
      });

      let categories = categoriesToFilterFor.get();

      expect(categories).toContain(categoryToFilterFor);

      const selectAllRadio = screen.getByText("Select All");

      await userEvent.click(selectAllRadio);

      categories = categoriesToFilterFor.get();

      expect(categories.length).toBe(0);

      cleanStores(categoriesToFilterFor);
    });
  });

  it("toggles classes in response to isOpen state", () => {
    keepMount(isLeftNavigationOpen);

    const { container } = render(<IconFilters categories={iconCategories} />);

    const parentElement = container.querySelector("aside");

    expect(parentElement?.classList.toString()).not.toContain(
      "icon-filters--active"
    );

    act(() => {
      isLeftNavigationOpen.set(true);
    });

    expect(parentElement?.classList.toString()).toContain(
      "icon-filters--active"
    );

    act(() => {
      isLeftNavigationOpen.set(false);
    });

    expect(parentElement?.classList.toString()).toContain(
      "icon-filters--hidden"
    );

    cleanStores(isLeftNavigationOpen);
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<IconFilters categories={iconCategories} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
