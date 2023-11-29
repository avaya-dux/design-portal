import { Branch, Leaf, Radio, RadioGroup, Tree } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components/react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-tree";
const sandbox =
  "https://codesandbox.io/s/neo-react-tree-gxwrvs?file=/src/App.js";

export const PlaygroundImplementation = () => {
  const [nested, setNested] = useState(true);

  const [element, react, html] = useMemo(() => {
    const implementation = nested ? (
      <Tree label="Nested Tree">
        <Branch title="Branch One (string)">
          <Leaf>leaf one</Leaf>
        </Branch>

        <Branch
          title={
            <div>
              <b>Branch Two</b> (div)
            </div>
          }
        >
          <Leaf>leaf two</Leaf>

          <Branch title="Branch Three (string)">
            <Leaf>leaf three</Leaf>
          </Branch>

          <Leaf>leaf four</Leaf>
        </Branch>
      </Tree>
    ) : (
      <Tree label="Flat Tree">
        <Leaf>leaf one</Leaf>

        <Leaf>leaf two</Leaf>
      </Tree>
    );

    return [
      implementation,
      prettyPrintReactElementToString(implementation),
      prettyPrintReactElementToHtml(implementation),
    ];
  }, [nested]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Tree View Option">
            <RadioGroup
              aria-label="Tree View Option"
              groupName="tree-is-nested"
              selected={nested ? "true" : "false"}
              onChange={(e) => setNested(e.target.value === "true")}
            >
              <Radio value="true">Nested</Radio>
              <Radio value="false">Flat</Radio>
            </RadioGroup>
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
      {element}
    </Playground>
  );
};
