import { TextInput } from "@avaya/neo-react";
import { render, screen } from "@testing-library/react";
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
