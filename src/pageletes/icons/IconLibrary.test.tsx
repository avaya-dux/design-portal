import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { cleanStores, keepMount } from "nanostores";

import { categoriesToFilterFor } from "./helpers/iconPageState";
import { iconCategories, icons } from "./helpers/icons";
import { IconLibrary } from "./IconLibrary";

describe("IconLibrary", () => {
  it("renders without exploding", () => {
    render(<IconLibrary allCategories={iconCategories} />);

    const iconLibraryChipElement = screen.getByRole("alert");

    expect(iconLibraryChipElement).toBeInTheDocument();
  });

  it("updates number of icons displayed in chip based on filters", () => {
    keepMount(categoriesToFilterFor);

    render(<IconLibrary allCategories={iconCategories} />);

    const allIconsLength = icons.length;

    const iconLibraryChipElement = screen.getByRole("alert");

    expect(iconLibraryChipElement).toHaveTextContent(
      `${allIconsLength} icons displayed`
    );

    act(() => {
      categoriesToFilterFor.set(["navigation"]);
    });

    const iconsInCategoryLength = icons.filter(
      (icon) => icon.category === "navigation"
    ).length;

    expect(iconLibraryChipElement).toHaveTextContent(
      `${iconsInCategoryLength} icons displayed`
    );
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <IconLibrary allCategories={iconCategories} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
