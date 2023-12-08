import { act, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { cleanStores, keepMount } from "nanostores";

import { isLeftNavigationOpen } from "components/react/utils/layoutState";

import { LeftNavigation } from ".";
import { allPagesMockData, filteredPagesMockData } from "../utils/shared-mocks";

describe("Left Navigation", () => {
  it("renders without exploding", () => {
    render(
      <LeftNavigation
        allPages={allPagesMockData}
        leftNavPages={filteredPagesMockData}
        currentUrl="/"
      />,
    );

    const navElement = screen.getByRole("navigation");

    expect(navElement).toBeInTheDocument();
  });

  it("toggles classes correctly when opened or closed", () => {
    keepMount(isLeftNavigationOpen);

    const { rerender } = render(
      <LeftNavigation
        allPages={allPagesMockData}
        leftNavPages={filteredPagesMockData}
        currentUrl="/"
      />,
    );

    const navElement = screen.getByRole("navigation");

    const parentDivElement = navElement.parentElement?.parentElement;

    expect(parentDivElement).not.toHaveClass("left-navigation--active");

    act(() => {
      isLeftNavigationOpen.set(true);
      rerender(
        <LeftNavigation
          allPages={allPagesMockData}
          leftNavPages={filteredPagesMockData}
          currentUrl="/"
        />,
      );
    });

    expect(parentDivElement).toHaveClass("left-navigation--active");

    act(() => {
      isLeftNavigationOpen.set(false);
      rerender(
        <LeftNavigation
          allPages={allPagesMockData}
          leftNavPages={filteredPagesMockData}
          currentUrl="/"
        />,
      );
    });

    expect(parentDivElement).toHaveClass("left-navigation--hidden");

    cleanStores(isLeftNavigationOpen);
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <LeftNavigation
        allPages={allPagesMockData}
        leftNavPages={filteredPagesMockData}
        currentUrl="/"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
