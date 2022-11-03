import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { CodeHighlight, Highlighter } from ".";

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

    expect(screen.queryByRole("img", { name: "icon copy" })).toBeNull();

    await user.click(screen.getByRole("button"));

    const notification = screen.getByRole("img", { name: "icon copy" });
    expect(notification).toBeDefined();

    waitForElementToBeRemoved(notification).then(() => {
      expect(screen.queryByRole("img", { name: "icon copy" })).toBeNull();
    });
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<CodeHighlight code={code} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();

    await user.click(screen.getByRole("button"));
    const resultsAfterClick = await axe(container);
    expect(resultsAfterClick).toHaveNoViolations();
  });

  it("Highlighter adds color style", () => {
    const code = "<div>hi</div>";
    const { container } = render(<Highlighter code={code} language="markdown" />);
    expect(container).toMatchInlineSnapshot(`
      <div>
        <pre>
          <div>
            <span
              class="token tag punctuation"
              style="color: rgb(212, 212, 212);"
            >
              &lt;
            </span>
            <span
              class="token tag"
              style="color: rgb(78, 201, 176);"
            >
              div
            </span>
            <span
              class="token tag punctuation"
              style="color: rgb(212, 212, 212);"
            >
              &gt;
            </span>
            <span
              class="token plain"
            >
              hi
            </span>
            <span
              class="token tag punctuation"
              style="color: rgb(212, 212, 212);"
            >
              &lt;/
            </span>
            <span
              class="token tag"
              style="color: rgb(78, 201, 176);"
            >
              div
            </span>
            <span
              class="token tag punctuation"
              style="color: rgb(212, 212, 212);"
            >
              &gt;
            </span>
          </div>
        </pre>
      </div>
    `);
  });
});
