import { Button, Sheet, type SheetProps, Switch } from "@avaya/neo-react";
import { useMemo, useState } from "react";
import { Playground } from "components/react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

const sandbox =
  "https://codesandbox.io/s/neo-react-sheet-forked-ylhxgw?file=/src/App.js";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/docs/components-sheet--docs";

const actions = [
  <Button variant="secondary" key="btn1">
    Action 1
  </Button>,
  <Button key="btn2">Action 2</Button>,
];

const getActions = (hasActions: boolean) => {
  return hasActions ? actions : [];
};

export const PlaygroundImplementation = () => {
  const [hasAnimation, setHasAnimation] = useState(true);
  const [hasActions, setHasActions] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

  const [element, react, html] = useMemo(() => {
    let props: SheetProps = {
      open: isOpen,
      title: "Title",
      slide: hasAnimation,
    };

    const actions = getActions(hasActions);

    if (hasActions) {
      props = { ...props, actions };
    }

    const element = (
      <Sheet aria-label="Title" {...props}>
        <div style={{ height: "300px", padding: "80px" }}>
          Content goes here
        </div>
      </Sheet>
    );

    return [
      element,
      prettyPrintReactElementToString(element),
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
