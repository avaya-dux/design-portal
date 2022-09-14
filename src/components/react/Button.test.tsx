import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import React from "react";

import { Button } from "./Button";

describe("Button", () => {
  it("fully renders without exploding", () => {
    render(<Button>Test</Button>);

    const rootElement = screen.getByRole("button");
    expect(rootElement).toBeDefined();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Button>Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
