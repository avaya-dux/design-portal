import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { TopNavSearch } from ".";
import { pagesMockData } from "./mocks";

describe("TopNavSearch", () => {
  it("renders without exploding", () => {
    render(<TopNavSearch pages={pagesMockData} />);

    const rootElement = screen.getByLabelText("Search Site");

    expect(rootElement).toBeTruthy();
  });

  it("responds correctly to mouse click events", async () => {
    render(<TopNavSearch pages={pagesMockData} />);

    const buttonElement = screen.getByRole("button");

    const modal = screen.queryByRole("dialog");

    expect(modal).not.toBeInTheDocument();

    await userEvent.click(buttonElement);

    const modalAfterClick = await screen.findByRole("dialog");

    expect(modalAfterClick).toBeTruthy();

    await userEvent.click(document.body);

    const modalAfterClickAway = screen.queryByRole("dialog");

    expect(modalAfterClickAway).not.toBeInTheDocument();
  });

  it("responds correctly to keyboard events", async () => {
    render(<TopNavSearch pages={pagesMockData} />);

    const modal = screen.queryByRole("dialog");

    expect(modal).not.toBeInTheDocument();

    await userEvent.keyboard("{Control>}");

    await userEvent.keyboard("{K}");

    const modalAfterKeydown = await screen.findByRole("dialog");

    expect(modalAfterKeydown).toBeTruthy();

    await userEvent.keyboard("{Escape}");

    const modalAfterEscapeKeyPress = screen.queryByRole("dialog");

    expect(modalAfterEscapeKeyPress).not.toBeInTheDocument();
  });

  it("displays search results when typed into modal", async () => {
    render(<TopNavSearch pages={pagesMockData} />);

    const buttonElement = screen.getByRole("button");

    await userEvent.click(buttonElement);

    const textInput = screen.getByRole("textbox");

    await userEvent.type(textInput, "About");

    const link = screen.getByRole("link");

    expect(link).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<TopNavSearch pages={pagesMockData} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
