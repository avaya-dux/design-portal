import { useMemo } from "react";

import { Playground } from "components/react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

const sandbox = "https://codesandbox.io/s/neo-react-table-p3yczb";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-table";

export const PlaygroundImplementation = () => {
  const [component, react, html] = useMemo(() => {
    const element = <div>TODO</div>;

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, []);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="TODO">
            <div>TODO</div>
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
      {component}
    </Playground>
  );
};
