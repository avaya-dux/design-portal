import { useState, useMemo } from "react";
import { Playground } from "components/react";
import {
  Checkbox,
  CheckboxGroup,
  type CheckboxProps,
  Image,
  TopNav,
  type TopNavProps,
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

const Logo = (
  <a href="/" title="Logo Link">
    <Image src={logoImage.src} isDecorativeOrBranding />
  </a>
);

// const buttons = [
//   <Button variant="secondary" key="btn1">
//     Action 1
//   </Button>,
//   <Button key="btn2">Action 2</Button>,
// ];

const getTitle = (hasTitle: boolean | undefined | "mixed") => {
  return hasTitle ? "My App" : undefined;
};

export const PlaygroundImplementation = () => {
  const [hasTitle, setHasTitle] = useState<CheckboxProps["checked"]>(false);

  const [element, react, html] = useMemo(() => {
    let props: TopNavProps = {
      logo: Logo
    };

    const title = getTitle(hasTitle);

    if (hasTitle) {
      props = { ...props, title };
    }

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
  }, [hasTitle]);

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
                  case "title":
                    setHasTitle(!hasTitle);
                    break;
                  case "search":
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
