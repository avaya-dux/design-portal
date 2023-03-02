import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { PlaygroundImplementation } from "./PlaygroundImplementation";

const codeContent = (element?: Node) => {
  return element?.textContent?.trim().replace("Copy code to clipboard", "");
};
describe("PlaygroundImplementation", () => {
  const user = userEvent.setup();

  it("fully renders with correct elements and code snippets", () => {
    render(<PlaygroundImplementation />);

    expect(screen.getAllByRole("tab")).toHaveLength(4); // html, react sandbox and storybook links
    expect(screen.getAllByRole("button")).toHaveLength(3); // copy, html tab, react tab
    expect(screen.getAllByRole("radio")).toHaveLength(5); // 3 sizes + 2 shapes
    expect(screen.getAllByRole("tabpanel")).toHaveLength(2);
    // html code is correct
    const htmlPanel = screen.getAllByRole("tabpanel")[0];
    expect(codeContent(htmlPanel)).toMatchInlineSnapshot(
      '"<div  aria-busy=\\"true\\"  aria-live=\\"polite\\"  role=\\"alert\\"  class=\\"neo-shimmer neo-shimmer__rectangle\\"></div>"'
    );
    // react code is correct
    const reactPanel = screen.getAllByRole("tabpanel")[1];
    expect(codeContent(reactPanel)).toMatchInlineSnapshot(
      '"<Shimmer loopInfinitely />"'
    );
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<PlaygroundImplementation />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
