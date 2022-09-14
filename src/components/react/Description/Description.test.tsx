import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Description } from "./";

describe("Description", () => {
  it("fully renders without exploding", () => {
    render(<Description>Test</Description>);

    const rootElement = screen.getByText("Test");
    expect(rootElement).toBeDefined();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Description>Test</Description>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
