import { useState, useMemo } from "react";
import { Playground } from "components/react";
import {
  Checkbox,
  CheckboxGroup,
  // type CheckboxProps,
  Image,
  TopNav,
  type TopNavProps,
  Button,
} from "@avaya/neo-react";

import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

import logoImage from "../imgs/logo-condensed-light.svg";
import "./PlaygroundImplementation.css";

const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-topnav";

const sandbox =
  "https://codesandbox.io/s/";

type ButtonOptions = "yes" | "no";

const Logo = (
  <a href="/" title="Logo Link">
    <Image src={logoImage.src} isDecorativeOrBranding />
  </a>
);

const buttons = [
  <Button variant="secondary" key="btn1">
    Action 1
  </Button>,
  <Button key="btn2">Action 2</Button>,
];

const getActions = (hasActions: boolean) => {
  return hasActions ? buttons : [];
};

export const PlaygroundImplementation = () => {
  const [hasButtons, setHasButtons] = useState<ButtonOptions>("yes");

  const [element, react, html] = useMemo(() => {
    let props: TopNavProps = {
      title: "My App Name",
      logo: Logo
    };

    // const buttons = getActions(hasButtons === "yes");

    // if (hasButtons === "yes") {
    //   props = { ...props };
    // }

    const element = (
      <div className="playground-topnav">
        <TopNav aria-label="Main header" {...props} />
      </div>
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [hasButtons]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Button Options">
            <CheckboxGroup
              groupName="Options"
              aria-labelledby="options"
              onChange={(e) => {
                const { value } = e.target as HTMLInputElement;
                switch (value) {
                  case "open":
                    // setOpen(!open);
                    // setStackedOpenIndexes([!open, !open, !open]);
                    break;
                  case "disabled":
                    // setOpen(false);
                    // setStackedOpenIndexes([false, false, false]);
                    // setDisabled(!disabled);
                    break;
                }
              }}
            >
              <Checkbox value="title">
                App title
              </Checkbox>
              <Checkbox value="search">
                Search
              </Checkbox>
            </CheckboxGroup>
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
