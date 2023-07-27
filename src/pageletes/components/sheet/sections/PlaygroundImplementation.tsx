import { Button, Radio, RadioGroup, Sheet, SheetProps, Switch } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import clsx from "clsx";

import { Playground } from "components/react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

const sandbox = "https://codesandbox.io/s/";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/";

export const PlaygroundImplementation = () => {
  const [hasAnimation, setHasAnimation] = useState<boolean>(true);
  const [hasActions, setHasActions] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const [element, react, html] = useMemo(() => {
    let props: SheetProps = {
      open: isOpen,
      title: "Title",
      slide: hasAnimation,
    };

    if (hasActions) {
      props = {
        ...props,
        actions: [
          <Button variant="secondary" key="btn1">Action 1</Button>,
          <Button key="btn2">Action 2</Button>,
        ],
      };
    }

    const actionsCode = hasActions
      ? `actions={[
    <Button variant="secondary" key="btn1">Action 1</Button>,
    <Button key="btn2">Action 2</Button>
  ]}`
      : "";

    const reactCode = `<Sheet
  open=${isOpen}
  slide=${hasAnimation}
  title="Title"
  ${actionsCode}
>
  <div
    style={{
      height: '300px',
      padding: '80px'
    }}
  >
    Content goes here
  </div>
</Sheet>`;

    const element = (
      <Sheet {...props}>
        <div style={{ height: "300px", padding: "80px" }}>Content goes here</div>
      </Sheet>
    );

    return [
      element,
      reactCode,
      prettyPrintReactElementToHtml(element),
    ];
  }, [hasActions, hasAnimation, isOpen]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Open Options">
            <Switch
              checked={isOpen}
              onChange={(_e, updatedChecked: boolean) =>
                setIsOpen(updatedChecked)
              }
            >
              Open / Close
            </Switch>
            <Switch
              checked={hasAnimation}
              onChange={(_e, updatedChecked: boolean) =>
                setHasAnimation(updatedChecked)
              }
            >
              Slide Animation
            </Switch>
          </Playground.OptionsSection>
          <Playground.OptionsSection title="Action Buttons">
            <Switch
              checked={hasActions}
              onChange={(_e, updatedChecked: boolean) =>
                setHasActions(updatedChecked)
              }
            >
              Use Buttons
            </Switch>
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
