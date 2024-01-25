import {
  Notification,
  Radio,
  RadioGroup,
} from "@avaya/neo-react";
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
  const [type, setType] = useState<TypeOption>("inline");

  const [isInline, element, react, html] = useMemo(() => {
    const isInline = type ==="inline"
    const element = <Notification
      type="info"
      header="Info"
      description="This is the general inplementation"
      actions={{
        actionButtons: {
          buttons: [
            {
              children: 'Edit',
              onClick: () => foo()
            },
            {
              children: 'Alert',
              onClick: () => foo()
            }
          ]
        }
      }}
        />;
    return [
      isInline,
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [type]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Type">
            <RadioGroup
              groupName="type"
              aria-label="Notification Type"
              selected={type}
              onChange={(e: { target: {value: string } }) => {
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
      <div style={{ width: "100%" }}>{
      isInline ? <Notification
            type="info"
            header="Info"
            description="This is inline inplimentation"
            isInline
            actions={{
              actionButtons: {
                buttons: [
                  {
                    children: 'Edit',
                    onClick: () => foo()
                  },
                  {
                    children: 'Alert',
                    onClick: () => foo()
                  }
                ]
              }
            }}
      /> : element}</div>
    </Playground>
  );
};
