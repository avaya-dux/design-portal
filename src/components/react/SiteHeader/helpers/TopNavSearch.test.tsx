import { render } from "@testing-library/react";

import type { AstroComponentFactory } from "astro/dist/runtime/server";
import { axe } from "jest-axe";

import { TopNavSearch } from ".";
import type { PageAstroInstance } from "../";

describe("TopNavSearch", () => {
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


  it("passes basic axe compliance", async () => {
    const { container } = render(<TopNavSearch pages={pagesMockData} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
