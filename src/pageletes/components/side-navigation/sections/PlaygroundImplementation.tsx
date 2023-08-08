import { LeftNav, type LeftNavProps, Switch } from "@avaya/neo-react";
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
  const [hasIcons, setHasIcons] = useState(true);

  const accountLinkItems = [
    <LeftNav.LinkItem href="http://example.com/1">Account</LeftNav.LinkItem>,
    <LeftNav.LinkItem href="http://example.com/2">
      Business Rules
    </LeftNav.LinkItem>,
    <LeftNav.LinkItem href="http://example.com/3">
      Contact Centers
    </LeftNav.LinkItem>,
  ];

  const analitycsLinkItems = [
    <LeftNav.LinkItem href="http://example.com/4">Dashboard</LeftNav.LinkItem>,
    <LeftNav.LinkItem href="http://example.com/5">
      Usage Report
    </LeftNav.LinkItem>,
  ];

  const categoryIcons = ["contact", "analytics"];

  const getLinkItems = (category: string) => {
    switch (category) {
      case "Accounts":
        return accountLinkItems;
      case "Analytics":
        return analitycsLinkItems;
      default:
        return null;
    }
  };

  const [element, react, html] = useMemo(() => {
    const props: LeftNavProps = {
      currentUrl: "",
    };

    const categoryNames = ["Accounts", "Analytics"];

    const listCategories = categoryNames.map((category, index) => {
      return hasIcons ? (
        <LeftNav.NavCategory icon={categoryIcons[index]} label={category}>
          {getLinkItems(category)}
        </LeftNav.NavCategory>
      ) : (
        <LeftNav.NavCategory label={category}>
          {getLinkItems(category)}
        </LeftNav.NavCategory>
      );
    });

    const settingsTopLinkItem = hasIcons ? (
      <LeftNav.TopLinkItem icon="settings" label="Settings" href="#settings" />
    ) : (
      <LeftNav.TopLinkItem label="Settings" href="#settings" />
    );

    const element = (
      <LeftNav aria-label="Main Navigation" {...props}>
        {listCategories} {settingsTopLinkItem}
      </LeftNav>
    );

    return [
      element,
      prettyPrintReactElementToString(element),
      prettyPrintReactElementToHtml(element),
    ];
  }, [hasIcons]);

  return (
    <Playground
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Open Options">
            <Switch
              checked={hasIcons}
              onChange={(_e, updatedChecked: boolean) =>
                setHasIcons(updatedChecked)
              }
            >
              Use Icons
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
