import type { ReactNode } from "react";
import { useCallback, useState } from "react";
import {
  Tab,
  TabLink,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@avaya/neo-react";

import { CodeHighlight } from "components/react";
import { OptionsSection, OptionsContainer } from "./helpers";

import "./Playground.css";

interface Examples {
  className?: string;

  html: string;
  react: string;
  sandbox: string;
  storybook: string;
}
export interface PlaygroundProps {
  children: ReactNode;
  examples: Examples;
  options: JSX.Element;
  title?: string;
  description?: string;
}

/**
 * The Playground component is used to display a component's examples and options.
 *
 * @example
  <Playground
    title="Button"
    examples={{
      html: `<button class="neo-btn neo-btn-primary">default</button>`,
      react: `<Button>default</Button>`,
      sandbox: "https://codesandbox.io/s/neo-react-button-qoluzy",
      storybook: "https://neo-react-library-storybook.netlify.app/?path=/story/components-button",
    }}
    options={
      <Playground.OptionsContainer onReset={resetExample}>
        <Playground.OptionsSection title="Look and feel">
          <RadioGroup
            name="variant"
            value={variant}
            onChange={setVariant}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
            ]}
          />

          <RadioGroup
            name="size"
            value={size}
            onChange={setSize}
            options={[
              { label: "Default", value: "default" },
              { label: "Small", value: "small" },
            ]}
          />
        </Playground.OptionsSection>

        <Playground.OptionsSection title="Direction">
          <Switch
            label="RTL"
            checked={dir === "rtl"}
            onChange={e => setDir(e.target.checked ? "rtl" : "ltr")}
          />
        </Playground.OptionsSection>
      </Playground.OptionsContainer>
    }
  >
    <Button>example</Button>
  </Playground>
 *
 * @see `playground/Playground.stories.tsx` for more details and examples.
 */
export const Playground = ({
  children,
  description,
  examples: { html, react, sandbox, storybook },
  options,
  title,
}: PlaygroundProps) => {
  const [activePanel, setActivePanel] = useState(0);
  const onTabPanelChange = useCallback(
    (panel: number) => {
      setActivePanel(panel);
    },
    [setActivePanel],
  );

  return (
    <div className="playground-container">
      {title && <label className="playground-title">{title}</label>}
      {description && <p className="playground-description">{description}</p>}

      <div className="playground-examples">
        <div className="playground-element">{children}</div>

        {options}

        <div className="playground-code">
          <Tabs onTabPanelChange={onTabPanelChange}>
            <TabList>
              <Tab id="html">HTML</Tab>

              <Tab id="react">React</Tab>

              <TabLink id="sandbox" href={sandbox}>
                CodeSandbox
              </TabLink>

              <TabLink id="storybook" href={storybook}>
                Storybook
              </TabLink>
            </TabList>

            <TabPanels>
              <TabPanel>
                <CodeHighlight code={html} active={activePanel === 0} />
              </TabPanel>

              <TabPanel>
                <CodeHighlight
                  code={react}
                  language="jsx"
                  active={activePanel === 1}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

Playground.displayName = "Playground";
Playground.OptionsContainer = OptionsContainer;
Playground.OptionsSection = OptionsSection;
