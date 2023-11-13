import { Radio, RadioGroup, Widget, Header, Content, Action, Icon } from "@avaya/neo-react";
import clsx from "clsx";
import { useMemo, useState, useEffect } from "react";

import { Playground } from "components";

import "./ToastPlayground.css";

const defaultReact = `<Toast position="top" duration={2000}>This is a toast</Toast>`;
const sandbox = "https://codesandbox.io/s/neo-react-toast-hdlfn9";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-toast--default";

type RightSideProps = "empty" | "button" | "iconbutton" | "inputs" | "switch";

export const PlaygroundImplementation = () => {
  const [withIcon, setWithIcon] = useState<boolean>(true);

  const [rightSide, setRightSide] = useState<RightSideProps>("empty");

  const [element, react, html] = useMemo(() => {

    const element = (
      <Widget>
      <Header>
        {withIcon && <Icon icon="chat" aria-label="chat" />}
        <p>Header of widget window</p>
      </Header>
      <Content>
        Adipisicing in consequat incididunt occaecat sit eu
        <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
        reprehenderit.
      </Content>
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
            <Playground.OptionsSection title="Variations">
              <Checkbox
                value="icon"
                checked={icon}
                onChange={() => {
                  setIcon(!icon);
                }}
              >
                Icon
              </Checkbox>
            </Playground.OptionsSection>
          </Playground.OptionsContainer>
        }
        examples={{
          html: html,
          react: isDefault ? defaultReact : react,
          sandbox,
          storybook,
        }}
      >
        <div className="toast-playground__wrapper">
          <Button
            onClick={() => {
              setReloadToast(!reloadToast);
              setShowToast(true);
            }}
          >
            Click to Show Toast
          </Button>
          {showToast && (
            <div
              className={clsx("neo-toast", `toast-playground__position--top`)}
              role="alert"
              aria-live="polite"
            >
              {icon && <span className="neo-toast__icon neo-icon-info"></span>}
              <div className="neo-toast__message">
                {icon ? `This is a toast with an icon` : `This is a toast`}
              </div>
            </div>
          )}
        </div>
      </Playground>
    </div>
  );
};
