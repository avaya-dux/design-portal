import { render, screen } from "@testing-library/react";

import type { AstroComponentFactory } from "astro/dist/runtime/server";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { PageAstroInstance, SiteHeader } from ".";

describe("SiteHeader", () => {
  const pagesMockData: PageAstroInstance[] = [
    {
      url: "",
      title: "Home",
      keywords: "Neo landing page",
      default: {} as AstroComponentFactory,
      file: "",
    },
    {
      url: "/about",
      title: "About",
      keywords: "About page",
      default: {} as AstroComponentFactory,
      file: "",
    },
    {
      url: "/contact",
      title: "Contact",
      keywords: "Contact page",
      default: {} as AstroComponentFactory,
      file: "",
    },
  ];

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
