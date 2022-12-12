import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { cleanStores, keepMount } from "nanostores";
import { vi } from "vitest";

import {
  isLeftNavigationOpen,
  leftNavToggleButtonRef,
} from "components/react/utils/layoutState";

import { LeftNavigation } from ".";
import { pagesMockData } from "../SiteHeader/helpers/mocks";

import type { Ref } from "react";

describe("Left Navigation", () => {
  it("renders without exploding", () => {
    render(<LeftNavigation pages={pagesMockData} currentUrl="/" />);

    const navElement = screen.getByRole("navigation");

    expect(navElement).toBeInTheDocument();
  });

  it("toggles classes correctly when opened or closed", () => {
    keepMount(isLeftNavigationOpen);

    const { rerender } = render(
      <LeftNavigation pages={pagesMockData} currentUrl="/" />
    );

    const navElement = screen.getByRole("navigation");

    const parentDivElement = navElement.parentElement?.parentElement;

    expect(parentDivElement).not.toHaveClass("left-navigation--active");

    act(() => {
      isLeftNavigationOpen.set(true);
      rerender(<LeftNavigation pages={pagesMockData} currentUrl="/" />);
    });

    expect(parentDivElement).toHaveClass("left-navigation--active");

    act(() => {
      isLeftNavigationOpen.set(false);
      rerender(<LeftNavigation pages={pagesMockData} currentUrl="/" />);
    });

    expect(parentDivElement).toHaveClass("left-navigation--hidden");
  });

  it("sets and traps focus correctly", async () => {
    isLeftNavigationOpen.set(true);

    leftNavToggleButtonRef.set({
      current: {
        focus: vi.fn(),
      },
    } as unknown as Ref<HTMLButtonElement>);

    render(<LeftNavigation pages={pagesMockData} currentUrl="/" />);

    const leftNavToggleButton = screen.getByRole("button");
    const firstLink = screen.getByText("Home");
    const lastLink = screen.getByText("Contact");

    expect(firstLink).toHaveFocus();

    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Tab}");
    await userEvent.keyboard("{Tab}");

    expect(leftNavToggleButton).toHaveFocus();

    await userEvent.keyboard("{Shift>}{Tab}");

    expect(lastLink).toHaveFocus();

    cleanStores(isLeftNavigationOpen);
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <LeftNavigation pages={pagesMockData} currentUrl="/" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
