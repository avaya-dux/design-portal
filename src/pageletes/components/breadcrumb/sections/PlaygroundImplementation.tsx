import { useState, useMemo } from "react";
import { Playground } from "components/react";
import { Breadcrumbs, type BreadcrumbsProps, Button, Radio, RadioGroup } from "@avaya/neo-react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";


const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/story/components-breadcrumb";

const sandbox = "https://codesandbox.io/s/";

type ButtonOptions = "yes" | "no";

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
  const [hasButtons, setHasButtons] = useState <ButtonOptions>("yes");

  const currentPage = { href: "#current_page", text: "Current Page" };

  const links = [
    { href: "#parent1", text: "First Level Page" },
  ];

  const [element, react, html] = useMemo(() => {

    let props: BreadcrumbsProps = {
      currentPageLink: currentPage,
      links: links,
    };

    const buttons = getActions(hasButtons === "yes");

    if (hasButtons === "yes") {
      props = { ...props, buttons}
    }

    const element = (
      <Breadcrumbs
        aria-label="Path to current page" {...props}
      />
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
            <RadioGroup
              groupName="label-options"
              selected={hasButtons}
              onChange={(e) => {
                setHasButtons(e.target.value as ButtonOptions);
              }}
            >
              <Radio value="yes">With Buttons</Radio>
              <Radio value="no">Without Buttons</Radio>
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
