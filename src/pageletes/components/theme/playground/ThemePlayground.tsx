import { Accordion, LeftNav, Radio, RadioGroup } from "@avaya/neo-react";
import { useMemo, useState } from "react";

import { Playground } from "components/react";
import {
  prettyPrintReactElementToHtml,
  prettyPrintReactElementToString,
} from "helpers";

import "./ThemePlayground.css";

export const sandbox =
  "https://codesandbox.io/s/neo-react-theme-provider-2vk8xl";
export const storybook =
  "https://neo-react-library-storybook.netlify.app/?path=/docs/components-neo-theme-provider--docs";

export const PlaygroundImplementation = () => {
  type ElementOption = "accordion" | "leftnav";

  type ThemeOption = "light" | "dark";

  const [element, setElement] = useState<ElementOption>("accordion");

  const [theme, setTheme] = useState<"light" | "dark">("light");

  const [elementToRender, react, html] = useMemo(() => {
    const accordion = (
      <div
        className={`neo-global-colors neo-${theme}`}
        style={{ width: "100%" }}
      >
        <Accordion header="Accordion 1">
          Inner content of Accordion example
        </Accordion>
        <Accordion header="Accordion 2">
          Inner content of Accordion example
        </Accordion>
        <Accordion header="Accordion 3">
          Inner content of Accordion example
        </Accordion>
      </div>
    );

    const sidenav = (
      <div className={`neo-global-colors neo-${theme}`}>
        <LeftNav aria-label="Main Navigation" currentUrl="http://example.com/1">
          <LeftNav.NavCategory expanded icon="contact" label="Accounts">
            <LeftNav.LinkItem href="http://example.com/1">
              Account
            </LeftNav.LinkItem>
            <LeftNav.LinkItem href="http://example.com/2">
              Business Rules
            </LeftNav.LinkItem>
            <LeftNav.LinkItem href="http://example.com/3">
              Contact Centers
            </LeftNav.LinkItem>
          </LeftNav.NavCategory>
          <LeftNav.NavCategory icon="analytics" label="Analytics">
            <LeftNav.LinkItem href="http://example.com/4">
              Dashboard
            </LeftNav.LinkItem>
            <LeftNav.LinkItem href="http://example.com/5">
              Usage Report
            </LeftNav.LinkItem>
          </LeftNav.NavCategory>
        </LeftNav>
      </div>
    );

    const elementToRender = element === "accordion" ? accordion : sidenav;
    return [
      elementToRender,
      prettyPrintReactElementToString(elementToRender),
      prettyPrintReactElementToHtml(elementToRender),
    ];
  }, [element, theme]);

  return (
    <Playground
      isPadded={false}
      options={
        <Playground.OptionsContainer>
          <Playground.OptionsSection title="Examples">
            <RadioGroup
              groupName="examples"
              selected={element}
              onChange={(e) => {
                setElement(e.target.value as ElementOption);
              }}
            >
              <Radio value="accordion">Accordion</Radio>
              <Radio value="leftnav">Side Navigation</Radio>
            </RadioGroup>
          </Playground.OptionsSection>
          <Playground.OptionsSection title="Theme">
            <RadioGroup
              groupName="theme"
              selected={theme}
              onChange={(e) => {
                setTheme(e.target.value as ThemeOption);
              }}
            >
              <Radio value="light">Light Mode</Radio>
              <Radio value="dark">Dark Mode</Radio>
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
      <div
        className={`theme-playground-example neo-global-colors neo-${theme}`}
      >
        {elementToRender}
      </div>
    </Playground>
  );
};
