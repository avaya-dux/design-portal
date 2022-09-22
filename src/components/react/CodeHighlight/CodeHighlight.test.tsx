import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { CodeHighlight } from ".";

describe("CodeHighlight", () => {
  const user = userEvent.setup();
  const code = "npm install @avaya/neo";

  it("fully renders without exploding", () => {
    const { container } = render(<CodeHighlight code={code} />);

    const copyBtn = screen.getByRole("button");
    expect(copyBtn).toBeDefined();

    const codeElement = container.querySelector("code");
    expect(codeElement).toBeDefined();
  });

  it("copies code to clipboard", async () => {
    render(<CodeHighlight code={code} />);

    await user.click(screen.getByRole("button"));

    const notification = screen.getByRole("img", { name: "icon copy" });
    expect(notification).toBeDefined();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<CodeHighlight code={code} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();

    await user.click(screen.getByRole("button"));
    const resultsAfterClick = await axe(container);
    expect(resultsAfterClick).toHaveNoViolations();
  });
});
