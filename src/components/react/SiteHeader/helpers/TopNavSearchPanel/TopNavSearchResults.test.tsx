import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { pagesMockData } from "../mocks";
import { TopNavSearchResults } from "./TopNavSearchResults";

describe("TopNavSearchResults", () => {
  it("renders without exploding", () => {
    render(<TopNavSearchResults options={pagesMockData} />);

    const allLinkElements = screen.getAllByRole("link");
    expect(allLinkElements).toBeTruthy();
  });

  it("responds correctly to keyboard navigation", async () => {
    const { getAllByRole } = render(
      <TopNavSearchResults options={pagesMockData} />,
    );

    const rootElement = getAllByRole("link");

    await userEvent.keyboard("{arrowdown}");

    expect(rootElement[0]).toHaveFocus();

    await userEvent.keyboard("{arrowup}");

    expect(rootElement[rootElement.length - 1]).toHaveFocus();
  });

  it("passes basic accessibility compliance", async () => {
    const { container } = render(
      <TopNavSearchResults options={pagesMockData} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
