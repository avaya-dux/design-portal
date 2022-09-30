import { Button, IconButton } from "@avaya/neo-react";
import { ReactNode, useState } from "react";

import "./Options.css";

/**
 * The OptionsContainer component is meant to be used in association with the Playground component.
 * It is used to wrap a grouping of `OptionsSection` components in order to provide a consistent
 * styling and layout.
 *
 * An `OptionsContainer` can contain multiple `OptionsSection` components. A `Playground` component
 * should contain one and only one `OptionsContainer` components.
 *
 * @example
  <Playground
    // ...
    options={
      <Playground.OptionsContainer onReset={resetExample}>
        <Playground.OptionsSection title="Variant">
          <RadioGroup
            name="variant"
            value={variant}
            onChange={setVariant}
            options={[
              { label: "Primary", value: "primary" },
              { label: "Secondary", value: "secondary" },
            ]}
          />

          <CheckboxGroup
            groupName="Variant"
            onChange={setVariant}
            checkboxes={[
              {
                label: "Primary",
                value: "primary",
                checked: true,
              },
              {
                label: "Secondary",
                value: "secondary",
                checked: false,
              },
            ]}
          />
        </Playground.OptionsSection>
      </Playground.OptionsContainer>
    }
  >
    <Button>example</Button>
  </Playground>
 */
export const OptionsContainer = ({
  children,
  onReset,
}: {
  children: ReactNode;
  onReset?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="options-container">
      <IconButton
        aria-label="Toggle Playground Options"
        className="toggle-all-options"
        icon={isOpen ? "close" : "preferences"}
        onClick={() => setIsOpen(!isOpen)}
        variant="tertiary"
      />

      <section
        className="playground-options"
        style={isOpen ? { display: "flex" } : undefined}
      >
        {children}

        {onReset && (
          <Button
            className="playground-options-reset-btn"
            variant="secondary"
            icon="undo"
            onClick={onReset}
          >
            Reset
          </Button>
        )}
      </section>
    </aside>
  );
};
