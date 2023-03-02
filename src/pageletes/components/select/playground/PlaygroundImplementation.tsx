import { useMemo } from "react";

import { Playground } from "components/react";

const sandbox = "https://codesandbox.io/";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-select--basic-selects";

export const PlaygroundImplementation = () => {
  const [react, html] = useMemo(() => {
    return ["reactCode", "htmlCode"];
  }, []);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="States">
            <p>TODO: add options</p>
          </Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        html,
        react,
        sandbox,
        storybook,
      }}
    >
      <p>TODO: add Select</p>
    </Playground>
  );
};
