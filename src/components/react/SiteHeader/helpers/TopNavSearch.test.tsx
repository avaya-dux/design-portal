import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { TopNavSearch } from ".";
import { pagesMockData } from "./mocks";

describe("TopNavSearch", () => {

  it("renders without exploding", () => {

    render(<TopNavSearch pages={pagesMockData}/>)

    const rootElement = screen.getByLabelText("Search Site");

    expect(rootElement).toBeTruthy();

  })

  it("passes basic axe compliance", async () => {
    const { container } = render(<TopNavSearch pages={pagesMockData} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
