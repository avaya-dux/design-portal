import { act, render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { cleanStores, keepMount } from "nanostores";
// import { vi } from "vitest";

import {
  isLeftNavigationOpen,
  // leftNavToggleButtonRef,
} from "components/react/utils/layoutState";

import { LeftNavigation } from ".";
import {
  allPagesMockData,
  filteredPagesMockData,
} from "../SiteHeader/helpers/mocks";

// import type { Ref } from "react";

describe("Left Navigation", () => {
  it("renders without exploding", () => {
    render(
      <LeftNavigation
        allPages={allPagesMockData}
        filteredpages={filteredPagesMockData}
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
        filteredpages={filteredPagesMockData}
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
          filteredpages={filteredPagesMockData}
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
          filteredpages={filteredPagesMockData}
          currentUrl="/"
        />,
      );
    });

    expect(parentDivElement).toHaveClass("left-navigation--hidden");

    cleanStores(isLeftNavigationOpen);
  });

  // it("sets and traps focus correctly", async () => {
  //   keepMount(isLeftNavigationOpen);
  //   isLeftNavigationOpen.set(true);

  //   leftNavToggleButtonRef.set({
  //     current: {
  //       focus: vi.fn(),
  //     },
  //   } as unknown as Ref<HTMLButtonElement>);

  //   render(
  //     <LeftNavigation
  //       allPages={allPagesMockData}
  //       filteredpages={filteredPagesMockData}
  //       currentUrl="/"
  //     />,
  //   );

  //   const leftNavToggleButton = screen.getByRole("button");
  //   const firstLink = screen.getByText("Home");
  //   const lastLink = screen.getByText("Contact");

  //   expect(firstLink).toHaveFocus();

  //   await userEvent.keyboard("{Tab}");
  //   await userEvent.keyboard("{Tab}");
  //   await userEvent.keyboard("{Tab}");

  //   expect(leftNavToggleButton).toHaveFocus();

  //   await userEvent.keyboard("{Shift>}{Tab}");

  //   expect(lastLink).toHaveFocus();

  //   cleanStores(isLeftNavigationOpen);
  // });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <LeftNavigation
        allPages={allPagesMockData}
        filteredpages={filteredPagesMockData}
        currentUrl="/"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
