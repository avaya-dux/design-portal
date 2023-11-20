import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { DoAndDont } from "./";

describe("DoAndDont", () => {
  const doInstructions = "Do instructions";
  const dontInstructions = "Don't instructions";
  const fakeDoExample = "fakedata do example";
  const fakeDontExample = "fakedata don't example";

  const DefaultExample = (
    <DoAndDont>
      <DoAndDont.DoContainer instructions={doInstructions}>
        <DoAndDont.ImageExampleContainer>
          {fakeDoExample}
        </DoAndDont.ImageExampleContainer>
      </DoAndDont.DoContainer>

      <DoAndDont.DontContainer instructions={dontInstructions}>
        <DoAndDont.ImageExampleContainer>
          {fakeDontExample}
        </DoAndDont.ImageExampleContainer>
      </DoAndDont.DontContainer>
    </DoAndDont>
  );

  it("fully renders without exploding", () => {
    render(DefaultExample);

    expect(screen.getAllByRole("img", { hidden: true })).toHaveLength(2); // hide icons per neo-1919

    const doContainer = screen.getByText(doInstructions);
    expect(doContainer).toBeDefined();

    const dontContainer = screen.getByText(dontInstructions);
    expect(dontContainer).toBeDefined();
  });

  it("allows the use of the `size=wide` prop", () => {
    render(DefaultExample);

    expect(screen.getAllByRole("img", { hidden: true })).toHaveLength(2); // hide icons per neo-1919

    const doContainer = screen.getByText(doInstructions);
    expect(doContainer).toBeDefined();

    const dontContainer = screen.getByText(dontInstructions);
    expect(dontContainer).toBeDefined();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(DefaultExample);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
