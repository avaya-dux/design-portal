import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { cleanStores, keepMount } from "nanostores";

import { variationsToFilterFor } from "./helpers/iconPageState";
import { icons } from "./helpers/icons";
import { IconCategory } from "./IconCategory";

describe("IconCategory", () => {
  const exampleCategory = "content";

  it("renders without exploding", () => {
    render(<IconCategory category={exampleCategory} />);

    const iconCategoryElement = screen.getByText(exampleCategory);

    expect(iconCategoryElement).toBeInTheDocument();
  });

  it("responds correctly when variants are filtered for", () => {
    keepMount(variationsToFilterFor);

    render(<IconCategory category={exampleCategory} />);

    const allIconsInCategory = icons.filter(
      (icon) => icon.category === exampleCategory
    );

    const bidirectionalIconsInCategory = allIconsInCategory.filter(
      (icon) => icon.bidirectional
    );

    const nonBidirectionalIconsInCategory = allIconsInCategory.filter(
      (icon) => !icon.bidirectional
    );

    allIconsInCategory.forEach((icon) => {
      const renderedIcon = screen.queryByText(icon.name);

      expect(renderedIcon).toBeInTheDocument();
    });

    act(() => {
      variationsToFilterFor.set(["bidirectional"]);
    });

    bidirectionalIconsInCategory.forEach((icon) => {
      const renderedIcon = screen.queryByText(icon.name);

      expect(renderedIcon).toBeInTheDocument();
    });

    nonBidirectionalIconsInCategory.forEach((icon) => {
      const renderedIcon = screen.queryByText(icon.name);

      expect(renderedIcon).not.toBeInTheDocument();
    });

    cleanStores(variationsToFilterFor);
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<IconCategory category={exampleCategory} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
