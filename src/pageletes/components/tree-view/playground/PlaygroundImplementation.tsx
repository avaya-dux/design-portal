import { useState } from "react";

import { Playground } from "components/react";

import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/docs/components-pagination--docs";

const sandbox =
  "https://codesandbox.io/s/neo-react-pagination-r7ffxy?file=/src/App.js";

export const PlaygroundImplementation = () => {
  const element = <></>;

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Tree View Options"></Playground.OptionsSection>
        </Playground.OptionsContainer>
      }
      examples={{
        html: prettyPrintReactElementToHtml(element),
        react: prettyPrintReactElementToString(element),
        sandbox,
        storybook,
      }}
    >
      {element}
    </Playground>
  );
};
