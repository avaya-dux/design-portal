import { Notification, Radio, RadioGroup } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";

import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

export const sandbox =
  "https://codesandbox.io/s/neo-react-notifications-dcplsu?file=/src/App.js";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-notification";

type TypeOption = "general" | "inline";

export const PlaygroundImplementation = () => {
  const [typeOption, setType] = useState<TypeOption>("general");

  const [element, react, html] = useMemo(() => {
    const inLine = typeOption === "inline";
    const description =
      typeOption === "inline"
        ? "This is inline implementation"
        : "This is general implementation";
    const element = (
      <Notification
        type="info"
        header="Info"
        description={description}
        isInline={inLine}
        actions={{
          actionButtons: {
            buttons: [
              {
                children: "Edit",
                onClick: () => {},
              },
              {
                children: "Alert",
                onClick: () => {},
              },
            ],
          },
        }}
      />
    );
    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [typeOption]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <RadioGroup
              groupName="type"
              aria-label="Notification Type"
              selected={typeOption}
              onChange={(e: { target: { value: string } }) => {
                setType(e.target.value as TypeOption);
              }}
            >
              <Radio value="general">General</Radio>
              <Radio value="inline">Inline</Radio>
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
      <div style={{ width: "100%" }}>{element}</div>
    </Playground>
  );
};
