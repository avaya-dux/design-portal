import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Header } from "./";

describe("Header", () => {
  window.alert = () => null;

  it("fully renders without exploding", () => {
    render(<Header>Test</Header>);

    const rootElement = screen.getByRole("heading");
    expect(rootElement).toBeDefined();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Header>Test</Header>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
