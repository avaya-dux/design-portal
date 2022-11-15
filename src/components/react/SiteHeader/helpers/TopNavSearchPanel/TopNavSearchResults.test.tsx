import { TextInput } from "@avaya/neo-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { pagesMockData } from "../mocks";
import { TopNavSearchResults } from "./TopNavSearchResults";

describe("TopNavSearchResults", () => {
  it("renders without exploding", () => {
    render(
      <TopNavSearchResults
      options={pagesMockData}
      />
    );

    const rootElement = screen.getAllByRole("link");
    expect(rootElement).toBeDefined();
  });

  it("passes basic accessibility compliance", async () => {
    const { container } = render(
      <TopNavSearchResults
      options={pagesMockData}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
