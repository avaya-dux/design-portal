import {
  LeftNav,
  type LeftNavProps,
  Radio,
  RadioGroup,
} from "@avaya/neo-react";
import { useMemo, useState } from "react";
import { Playground } from "components/react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

const sandbox =
  "https://codesandbox.io/s/neo-react-sidenav-forked-5yml3c?file=/src/App.js";
const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/docs/components-left-navigation--docs";

export const PlaygroundImplementation = () => {
  type IconOption = "icon" | "none";
  const [iconType, setIconType] = useState<IconOption>("icon");

  const [element, react, html] = useMemo(() => {
    const props: LeftNavProps = {
      currentUrl: "http://example.com/1",
    };

    const expandedStates = [true, false];

    const accountLinkItems = [
      <LeftNav.LinkItem href="http://example.com/1">Account</LeftNav.LinkItem>,
      <LeftNav.LinkItem href="http://example.com/2">
        Business Rules
      </LeftNav.LinkItem>,
      <LeftNav.LinkItem href="http://example.com/3">
        Contact Centers
      </LeftNav.LinkItem>,
    ];

    const analyticsLinkItems = [
      <LeftNav.LinkItem href="http://example.com/4">
        Dashboard
      </LeftNav.LinkItem>,
      <LeftNav.LinkItem href="http://example.com/5">
        Usage Report
      </LeftNav.LinkItem>,
    ];

    const categoryNames = ["Accounts", "Analytics"];
    const categoryIcons = ["contact", "analytics"];

    const getLinkItems = (category: string) => {
      switch (category) {
        case "Accounts":
          return accountLinkItems;
        case "Analytics":
          return analyticsLinkItems;
        default:
          return null;
      }
    };

    const listCategories = categoryNames.map((category, index) => {
      return iconType === "icon" ? (
        <LeftNav.NavCategory
          expanded={expandedStates[index]}
          icon={categoryIcons[index]}
          label={category}
        >
          {getLinkItems(category)}
        </LeftNav.NavCategory>
      ) : (
        <LeftNav.NavCategory expanded={expandedStates[index]} label={category}>
          {getLinkItems(category)}
        </LeftNav.NavCategory>
      );
    });

    const settingsTopLinkItem =
      iconType === "icon" ? (
        <LeftNav.TopLinkItem
          icon="settings"
          label="Settings"
          href="#settings"
        />
      ) : (
        <LeftNav.TopLinkItem label="Settings" href="#settings" />
      );

    const element = (
      <LeftNav aria-label="Main Navigation" {...props}>
        {listCategories}
        {settingsTopLinkItem}
      </LeftNav>
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [iconType]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Icon Options">
            <RadioGroup
              groupName="options"
              selected={iconType}
              onChange={(e) => {
                setIconType(e.target.value as IconOption);
              }}
            >
              <Radio value="icon">With Icon</Radio>
              <Radio value="none">Text Only</Radio>
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
      <div style={{ minWidth: "15rem" }}>{element}</div>
    </Playground>
  );
};
