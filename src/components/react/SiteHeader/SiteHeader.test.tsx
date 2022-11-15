import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { SiteHeader } from ".";
import { pagesMockData } from "./helpers/mocks";

describe("SiteHeader", () => {
  beforeEach(() => {
    // for the `Logo` component, need to mock `window.matchMedia`
    vi.stubGlobal(
      "matchMedia",
      vi.fn(() => ({
        matches: false,
      }))
    );

    return () => {
      vi.resetAllMocks();
    };
  });

  it("fully renders without exploding", () => {
    render(<SiteHeader pathname="/" pages={pagesMockData} />);

    const rootElement = screen.getByRole("navigation");
    expect(rootElement).toBeDefined();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <SiteHeader pathname="/" pages={pagesMockData} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
