import {
  Tab,
  TabLink,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@avaya/neo-react";

import type { ReactNode } from "react";
import { CodeHighlight } from "../CodeHighlight";
import { OptionsSection, OptionsContainer } from "./helpers";

import styles from "./Playground.module.css";

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
  return (
    <div className={styles["playground-container"]}>
      {title && <label className={styles["playground-title"]}>{title}</label>}
      {description && (
        <p className={styles["playground-description"]}>{description}</p>
      )}

      <div className={styles["playground-examples"]}>
        <div className={styles["playground-element"]}>{children}</div>

        {options}

        <div className={styles["playground-code"]}>
          <Tabs>
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
                <CodeHighlight code={html} />
              </TabPanel>

              <TabPanel>
                <CodeHighlight code={react} />
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
