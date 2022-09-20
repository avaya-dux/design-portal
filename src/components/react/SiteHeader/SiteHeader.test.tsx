import { render, screen } from "@testing-library/react";
import type { AstroComponentFactory } from "astro/dist/runtime/server";
import { axe } from "jest-axe";

import { PageAstroInstance, SiteHeader } from ".";

describe("SiteHeader", () => {
  const pagesMockData: PageAstroInstance[] = [
    {
      url: "/",
      title: "Home",
      description: "Home page",
      default: {} as AstroComponentFactory,
      file: "",
    },
    {
      url: "/about",
      title: "About",
      description: "About page",
      default: {} as AstroComponentFactory,
      file: "",
    },
    {
      url: "/contact",
      title: "Contact",
      description: "Contact page",
      default: {} as AstroComponentFactory,
      file: "",
    },
  ];

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
