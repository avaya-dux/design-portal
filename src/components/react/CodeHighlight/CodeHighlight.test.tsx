import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { CodeHighlight, Highlighter } from "./CodeHighlight";

describe("CodeHighlight", () => {
  const user = userEvent.setup();
  const code = "npm install @avaya/neo";

  it("fully renders without exploding", () => {
    const { container } = render(<CodeHighlight code={code} active />);

    const copyBtn = screen.getByRole("button");
    expect(copyBtn).toBeDefined();

    const codeElement = container.querySelector("code");
    expect(codeElement).toBeDefined();
  });

  it("copies code to clipboard and changes tooltip text", async () => {
    render(<CodeHighlight code={code} active />);

    expect(screen.queryByRole("tooltip")?.textContent).toEqual(
      "Copy code to clipboard"
    );

    await user.click(screen.getByRole("button"));

    expect(screen.queryByRole("tooltip")?.textContent).toEqual("Copied");
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<CodeHighlight code={code} active />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();

    await user.click(screen.getByRole("button"));
    const resultsAfterClick = await axe(container);
    expect(resultsAfterClick).toHaveNoViolations();
  });
});

describe("Highlighter", () => {
  it("should add color style to div tag", () => {
    const code = "<div>hi</div>";
    render(<Highlighter code={code} language="markdown" />);
    const divs = screen.getAllByText("div");
    expect(divs.length).toEqual(2);
    divs.forEach((div) => {
      expect(div).toHaveClass("token");
      expect(div).toHaveStyle("color: rgb(78, 201, 176);");
    });
  });
});
