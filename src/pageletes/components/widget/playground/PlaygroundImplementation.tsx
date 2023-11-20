import { Button, Icon, IconButton, Radio, RadioGroup, Switch, TextInput, Widget, WidgetAction, WidgetContent, WidgetHeader } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components";
import { prettyPrintReactElementToHtml, prettyPrintReactElementToString } from "helpers";

const sandbox = "https://codesandbox.io/s/neo-react-widget-5qlt65";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/docs/components-widget--docs";

type RightSideProps = "empty" | "button" | "iconbutton" | "inputs" | "switch";

export const PlaygroundImplementation = () => {
  const [withIcon, setWithIcon] = useState<string>("icon");

  const [rightSide, setRightSide] = useState<RightSideProps>("empty");

  const [element, react, html] = useMemo(() => {
    const getRightSideAction = (rightSide: RightSideProps) => {
      switch (rightSide) {
        case "empty":
          return "";
        case "button":
          return <Button>Button</Button>;
        case "iconbutton":
          return <IconButton aria-label="add item" icon="add"></IconButton>;
        case "inputs":
          return <TextInput aria-label="widget input" />;
        case "switch":
          return <Switch aria-label="switch input"></Switch>;
        default:
          return "";
      }
    };

    const element = (
      <Widget>
        <WidgetHeader>
          {withIcon === "icon" && <Icon icon="chat" aria-label="chat" />}
          <p>Header of widget window</p>
        </WidgetHeader>
        <WidgetAction>{getRightSideAction(rightSide)}</WidgetAction>
        <WidgetContent>
          Adipisicing in consequat incididunt occaecat sit eu
          <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
          reprehenderit.
        </WidgetContent>
      </Widget>
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [withIcon, rightSide]);

  return (
    <div>
      <Playground
        options={
          <Playground.OptionsContainer>
            <Playground.OptionsSection title="Type">
              <RadioGroup
                groupName="type"
                selected={withIcon}
                onChange={(e) => setWithIcon(e.target.value)}
              >
                <Radio value="icon">With Icon</Radio>
                <Radio value="no-icon">No Icon</Radio>
              </RadioGroup>
            </Playground.OptionsSection>
            <Playground.OptionsSection title="Right Side">
              <RadioGroup
                groupName="actions"
                selected={rightSide}
                onChange={(e) => setRightSide(e.target.value as RightSideProps)}
              >
                <Radio value="empty">Empty</Radio>
                <Radio value="button">Button</Radio>
                <Radio value="iconbutton">Icon Button</Radio>
                <Radio value="inputs">Inputs</Radio>
                <Radio value="switch">Switch</Radio>
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
    </div>
  );
};
