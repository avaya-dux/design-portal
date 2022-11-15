import { TextInput } from "@avaya/neo-react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { axe } from "jest-axe";

import { pagesMockData } from "../mocks";
import { TopNavSearchPanel } from "./TopNavSearchPanel";

describe("TopNavSearchPanel", () => {
  it("renders without exploding", () => {
    render(
      <TopNavSearchPanel
        open
        options={pagesMockData}
        children={<TextInput aria-label="test text input" />}
      />
    );

    const rootElement = screen.getByRole("dialog");
    expect(rootElement).toBeDefined();
  });

  it("renders correctly when window resizes to mobile screen sizes", () => {

    const customGlobal: any = global;

    customGlobal.innerWidth = 800;

    render(
      <TopNavSearchPanel
        open
        options={pagesMockData}
        children={<TextInput aria-label="test text input" />}
      />
    );

    const keyboardNavInstructions = screen.getAllByRole("img");

    keyboardNavInstructions.forEach(async element => {
      await waitFor(() => expect(element).toBeVisible());
    })

    act(() => {
      customGlobal.innerWidth = 300;
      fireEvent(customGlobal, new Event("resize"));
    });

    const keyBoardNavInstructionsAtMobile = screen.getAllByRole("img")

    keyBoardNavInstructionsAtMobile.forEach(async element => {
      await waitFor(() => expect(element).not.toBeVisible());
    })

  });

  it("passes basic accessibility compliance", async () => {
    const { container } = render(
      <TopNavSearchPanel
        open
        options={pagesMockData}
        children={<TextInput aria-label="test text input" />}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
