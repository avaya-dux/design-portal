import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { SiteHeader } from ".";

describe("SiteHeader", () => {
  it("fully renders without exploding", () => {
    render(<SiteHeader />);

    const rootElement = screen.getByRole("navigation");
    expect(rootElement).toBeDefined();

    const logoElement = screen.getByRole("img");
    expect(logoElement).toBeDefined();

    const navButtons = screen.getAllByRole("button");
    expect(navButtons).toHaveLength(6);
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<SiteHeader />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
