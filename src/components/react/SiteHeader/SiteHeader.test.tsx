import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { AstroComponentFactory } from "astro/dist/runtime/server";
import { axe } from "jest-axe";

import { PageAstroInstance, SiteHeader } from ".";

describe("SiteHeader", () => {
  const user = userEvent.setup();

  const searchRole = "searchbox";
  const searchResultQuery = "[role='dialog'] a";
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

  describe("Search functionality", () => {
    it("should not show search results when search input is empty", () => {
      const { container } = render(
        <SiteHeader pathname="/" pages={pagesMockData} />
      );

      expect(container.querySelector(searchResultQuery)).toBeNull();
    });

    it("should show search results when search input is not empty", async () => {
      const { container } = render(
        <SiteHeader pathname="/" pages={pagesMockData} />
      );

      const searchInput = screen.getByRole(searchRole);
      await user.type(searchInput, "home");

      expect(container.querySelector(searchResultQuery)).not.toBeNull();
    });

    it("allows tabbing to search results", async () => {
      render(<SiteHeader pathname="/" pages={pagesMockData} />);

      const searchInput = screen.getByRole(searchRole);
      await user.type(searchInput, "home");

      await user.tab(); // tab to "close" button in input
      await user.tab(); // tab to first search result

      expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();
    });

    it("closes `Sheet` when search is made empty", async () => {
      const { container } = render(
        <SiteHeader pathname="/" pages={pagesMockData} />
      );

      const searchInput = screen.getByRole(searchRole);

      await user.type(searchInput, "home");
      expect(container.querySelector(searchResultQuery)).not.toBeNull();

      await user.clear(searchInput);
      expect(container.querySelector(searchResultQuery)).toBeNull();
    });

    it("closes `Sheet` when 'Close' button is clicked", async () => {
      const { container } = render(
        <SiteHeader pathname="/" pages={pagesMockData} />
      );

      const searchInput = screen.getByRole(searchRole);
      await user.type(searchInput, "home");
      expect(container.querySelector(searchResultQuery)).not.toBeNull();

      const closeButton = screen.getByRole("button", { name: "Close" });
      await user.click(closeButton);
      expect(container.querySelector(searchResultQuery)).toBeNull();
    });
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <SiteHeader pathname="/" pages={pagesMockData} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
