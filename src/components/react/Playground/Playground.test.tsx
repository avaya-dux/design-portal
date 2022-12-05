import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { vi } from "vitest";

import { Playground } from "./";

describe("Playground", () => {
  const user = userEvent.setup();

  const title = "Playground title";
  const description = "Playground description";
  const exampleContent = "Playground example";
  const exampleCode = {
    html: `<button class="neo-btn neo-btn-primary">default</button>`,
    react: "<Button>default</Button>",
    sandbox: "https://codesandbox.io/s/neo-react-button-qoluzy",
    storybook:
      "https://neo-react-library-storybook.netlify.app/?path=/story/components-button",
  };
  const option = "Playground option";
  const resetSpy = vi.fn();

  const DefaultExample = (
    <Playground
      title={title}
      description={description}
      examples={exampleCode}
      options={
        <Playground.OptionsContainer onReset={resetSpy}>
          <Playground.OptionsSection title="Direction">
            {option}
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
    >
      {exampleContent}
    </Playground>
  );

  it("fully renders without exploding", () => {
    render(DefaultExample);

    expect(screen.getAllByRole("tab")).toHaveLength(4); // html, react sandbox and storybook links
    expect(screen.getAllByRole("button")).toHaveLength(4); // reset, copy, html tab, react tab
  });

  it("fires the event when a user 'resets' the options", async () => {
    render(DefaultExample);
    expect(resetSpy).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Reset" }));
    expect(resetSpy).toHaveBeenCalledTimes(1);
  });

  it("allows the toggling of options on smaller screens", async () => {
    // mock smaller screen, stolen from: https://stackoverflow.com/a/59257165/1022765
    Object.defineProperties(window.HTMLElement.prototype, {
      offsetWidth: {
        get: function () {
          return this.tagName === "SPAN" ? 100 : 500;
        },
      },
    });
    render(DefaultExample);

    expect(screen.getAllByRole("button")).toHaveLength(4); // section toggle, reset, copy, html tab, react tab

    const toggleButton = screen.getByRole("button", {
      name: "Toggle Playground Options",
    });
    expect(toggleButton.children[0]).toHaveClass("neo-icon-preferences");

    await user.click(toggleButton);
    expect(toggleButton.children[0]).toHaveClass("neo-icon-close");
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(DefaultExample);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
