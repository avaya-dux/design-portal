import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { PageTitle } from ".";

describe("PageTitle", () => {
  it("fully renders without exploding", () => {
    render(<PageTitle>Test</PageTitle>);

    const rootElement = screen.getByRole("heading");
    expect(rootElement).toBeDefined();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<PageTitle>Test</PageTitle>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
